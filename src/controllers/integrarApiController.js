// ✅ CONFIGURAÇÃO PADRONIZADA - Use esta estrutura em TODAS as fontes
const fontesBiblioteca = [
    {
        id: 'capitaes_arena', // ← ID único para debug
        nomeLivro: 'Capitães da Areia',
        urlCompleta:
            process.env.URL_LIVRO_CAPITAES_DA_AREIA ||
            'https://readflow-m8o6.onrender.com/api/livros',
        apiKey: process.env.API_KEY_CAPITAES_DA_AREIA, // ← Configure esta variável no Render (ex: READFLOW_API_KEY )
        requerApiKey: true,
        authType: 'header', // ← 'header' | 'bearer' | 'query'
        authHeaderName: 'x-api-key', // ← Nome do header quando authType === 'header'
        timeoutMs: 10000, // ← Timeout por fonte (opcional)
    },
    {
        id: 'o_guarani',
        nomeLivro: 'O Guarani',
        urlCompleta:
            process.env.URL_LIVRO_O_GUARANI || 'https://bookpedia-backend-4ab3.onrender.com/livros',
        apiKey: process.env.API_KEY_O_GUARANI, // ← Configure esta variável no Render (ex: BOOKPEDIA_API_KEY )
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 10000,
    },
    {
        id: 'quartos_despejo',
        nomeLivro: 'Quartos de Despejo',
        urlCompleta:
            process.env.URL_LIVRO_QUARTOS_DESPEJO ||
            'https://backend-projeto-integrador-rana.onrender.com/api/livro',
        apiKey: 'amods', // API Key fornecida pelo usuário para o próprio livro
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 10000,
    },
    {
        id: 'memorias_bras_cubas',
        nomeLivro: 'Memórias Póstumas de Brás Cubas',
        urlCompleta: process.env.URL_LIVRO_MEMORIAS || 'https://projeto-clubyx.onrender.com/livros',
        apiKey: process.env.API_KEY_MEMORIAS, // ← Configure esta variável no Render (ex: CLUBYX_API_KEY )
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 10000,
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
        'Título não informado',
    ),
    autor: obterPrimeiroValor(item, ['autor', 'author', 'nomeAutor'], 'Autor não informado'),
    capa_url: obterPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto'], // Adicionado 'capaURl' e 'capaUrl'
        null,
    ),
    ano: obterPrimeiroValor(item, ['ano', 'year', 'ano_publicacao'], 'N/A'),
    genero_pt: obterPrimeiroValor(
        item,
        ['genero_pt', 'genero', 'genre_pt', 'categoria', 'category'],
        'Gênero não informado',
    ),
    genero_en: obterPrimeiroValor(
        item,
        ['genero_en', 'genre', 'category_en'],
        'Genre not informed',
    ),
    enredo_pt: obterPrimeiroValor(
        item,
        ['enredo_pt', 'resumo', 'sinopse', 'summary', 'description_pt'],
        'Enredo não informado',
    ),
    enredo_en: obterPrimeiroValor(
        item,
        ['enredo_en', 'description', 'summary_en'],
        'Description not informed',
    ),
});

const montarCabecalhos = (fonte) => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    // Se não requer API Key ou não tem chave, retorna headers básicos
    if (!fonte.requerApiKey || !fonte.apiKey) {
        return headers;
    }

    // Suporte a diferentes tipos de autenticação
    switch (fonte.authType) {
        case 'bearer':
            headers.Authorization = `Bearer ${fonte.apiKey}`;
            break;
        case 'query':
            // Será adicionado na URL, não no header
            break;
        case 'header':
        default:
            // Usa o nome do header configurado ou padrão 'x-api-key'
            const headerName = fonte.authHeaderName || 'x-api-key';
            headers[headerName] = fonte.apiKey;
            break;
    }

    return headers;
};

const consultarFonteBiblioteca = async (fonte) => {
    if (!fonte.urlCompleta) {
        throw new Error('URL da API externa ausente na configuração dessa fonte.');
    }

    if (fonte.requerApiKey && !fonte.apiKey) {
        throw new Error(
            `API Key ausente para a fonte "${fonte.nomeLivro}". Verifique as variáveis de ambiente.`,
        );
    }

    // Monta URL final (suporte para auth via query string)
    let urlFinal = fonte.urlCompleta;
    if (fonte.authType === 'query' && fonte.apiKey) {
        const separador = urlFinal.includes('?') ? '&' : '?';
        urlFinal += `${separador}api_key=${encodeURIComponent(fonte.apiKey)}`;
    }

    const controlador = new AbortController();
    const tempoLimiteMs = fonte.timeoutMs || 10000;
    const temporizador = setTimeout(() => controlador.abort(), tempoLimiteMs);

    try {
        const resposta = await fetch(urlFinal, {
            method: 'GET',
            headers: montarCabecalhos(fonte),
            signal: controlador.signal,
            // Adiciona cache: 'no-store' para evitar respostas cacheadas indevidamente
            cache: 'no-store',
        });

        if (!resposta.ok) {
            const textoErro = await resposta.text().catch(() => 'Sem detalhes');
            throw new Error(`Erro na API externa - Status: ${resposta.status} - ${textoErro}`);
        }

        const dadosBrutos = await resposta.json();
        const itens = extrairListaResposta(dadosBrutos);
        const dadosFormatados = itens.map((item) => normalizarLivro(item));

        return {
            id: fonte.id,
            livro: fonte.nomeLivro,
            statusApi: 'Online',
            totalItens: dadosFormatados.length,
            conteudo: dadosFormatados,
        };
    } catch (erro) {
        if (erro.name === 'AbortError') {
            throw new Error(`Timeout após ${fonte.timeoutMs || 10000}ms`);
        }
        throw erro;
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
                    erroFonte.message,
                );

                return {
                    id: fonte.id,
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