const fontesBiblioteca = [
    {
        nomeLivro: 'Capitães da Areia',
        urlCompleta:
            process.env.URL_LIVRO_CAPITAES_DA_AREIA ||
            'https://readflow-m8o6.onrender.com/api/livros',
        apiKey: process.env.KEY_LIVRO_CAPITAES_DA_AREIA,
        requerApiKey: true,
        authHeader: 'x-api-key',
    },
];

const obterPrimeiroValor = (objeto, chaves, valorPadrao = null) => {
    for (const chave of chaves) {
        const valor = objeto?.[chave];
        if (valor !== undefined && valor !== null && valor !== '') {
            return valor;
        }
    }

    return valorPadrao;
};

const extrairListaResposta = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (!payload || typeof payload !== 'object') {
        return [];
    }

    const chavesPossiveis = ['data', 'dados', 'livros', 'results', 'conteudo', 'itens'];

    for (const chave of chavesPossiveis) {
        const valor = payload[chave];
        if (Array.isArray(valor)) {
            return valor;
        }
    }

    return [];
};

const normalizarLivro = (item) => ({
    titulo: obterPrimeiroValor(
        item,
        ['titulo', 'title', 'nome', 'nomeLivro'],
        'Título não informado'
    ),
    autor: obterPrimeiroValor(item, ['autor', 'author', 'nomeAutor'], 'Autor não informado'),
    capa_url: obterPrimeiroValor(
        item,
        ['capa', 'image', 'cover', 'url_capa', 'imagem', 'foto'],
        null
    ),
    ano: obterPrimeiroValor(item, ['ano', 'year', 'ano_publicacao'], 'N/A'),
    genero_pt: obterPrimeiroValor(
        item,
        ['genero_pt', 'genero', 'genre_pt', 'categoria', 'category'],
        'Gênero não informado'
    ),
    genero_en: obterPrimeiroValor(
        item,
        ['genero_en', 'genre', 'category_en'],
        'Genre not informed'
    ),
    enredo_pt: obterPrimeiroValor(
        item,
        ['enredo_pt', 'resumo', 'sinopse', 'summary', 'description_pt'],
        'Enredo não informado'
    ),
    enredo_en: obterPrimeiroValor(
        item,
        ['enredo_en', 'description', 'summary_en'],
        'Description not informed'
    ),
});

const montarCabecalhos = (fonte) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (!fonte.apiKey) {
        return headers;
    }

    if (fonte.authType === 'bearer') {
        headers.Authorization = `Bearer ${fonte.apiKey}`;
        return headers;
    }

    headers[fonte.authHeader || 'x-api-key'] = fonte.apiKey;
    return headers;
};

const consultarFonteBiblioteca = async (fonte) => {
    if (!fonte.urlCompleta) {
        throw new Error('URL da API externa ausente na configuração dessa fonte.');
    }

    if (fonte.requerApiKey !== false && !fonte.apiKey) {
        throw new Error('API Key ausente na configuração dessa fonte.');
    }

    const controlador = new AbortController();
    const tempoLimiteMs = fonte.tempoLimiteMs || 10000;
    const temporizador = setTimeout(() => controlador.abort(), tempoLimiteMs);

    try {
        const resposta = await fetch(fonte.urlCompleta, {
            method: 'GET',
            headers: montarCabecalhos(fonte),
            signal: controlador.signal,
        });

        if (!resposta.ok) {
            throw new Error(`Erro na API externa - Status: ${resposta.status}`);
        }

        const dadosBrutos = await resposta.json();
        const itens = extrairListaResposta(dadosBrutos);
        const dadosFormatados = itens.map((item) => normalizarLivro(item));

        return {
            livro: fonte.nomeLivro,
            statusApi: 'Online',
            totalItens: dadosFormatados.length,
            conteudo: dadosFormatados,
        };
    } finally {
        clearTimeout(temporizador);
    }
};

export const obterBibliotecaCompleta = async (req, res) => {
    try {
        const promessas = fontesBiblioteca.map(async (fonte) => {
            try {
                return await consultarFonteBiblioteca(fonte);
            } catch (erroFonte) {
                console.error(
                    `[Erro de Integração] Falha ao acessar a fonte "${fonte.nomeLivro}":`,
                    erroFonte.message
                );

                return {
                    livro: fonte.nomeLivro,
                    statusApi: 'Indisponível',
                    totalItens: 0,
                    conteudo: null,
                    erro: erroFonte.message,
                };
            }
        });

        const bibliotecaCompleta = await Promise.all(promessas);

        return res.status(200).json(bibliotecaCompleta);
    } catch (error) {
        console.error('Erro crítico no servidor centralizador:', error.message);
        return res.status(500).json({ erro: 'Erro interno ao processar a biblioteca integrada.' });
    }
};
