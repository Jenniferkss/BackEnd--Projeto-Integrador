const fontesBiblioteca = [
    {
        id: 'capitaes_arena',
        nomeLivro: 'Capitães da Areia',
        urlCompleta:
            process.env.URL_LIVRO_CAPITAES_DA_AREIA ||
            'https://readflow-m8o6.onrender.com/api/livros',
        apiKey: process.env.API_KEY_CAPITAES_DA_AREIA,
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 8000,
    },
    {
        id: 'o_guarani',
        nomeLivro: 'O Guarani',
        urlCompleta:
            process.env.URL_LIVRO_O_GUARANI || 'https://bookpedia-backend-4ab3.onrender.com/livros',
        apiKey: process.env.API_KEY_O_GUARANI,
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 8000,
    },
    {
        id: 'quartos_despejo',
        nomeLivro: 'Quarto de Despejo',
        urlCompleta:
            process.env.URL_LIVRO_QUARTOS_DESPEJO ||
            'https://backend-projeto-integrador-rana.onrender.com/api/livro',
        apiKey: process.env.API_KEY_QUARTO_DE_DESPEJO || 'amods',
        requerApiKey: false,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 8000,
    },
    {
        id: 'memorias_bras_cubas',
        nomeLivro: 'Memórias Póstumas de Brás Cubas',
        urlCompleta: process.env.URL_LIVRO_MEMORIAS || 'https://projeto-clubyx.onrender.com/livros',
        apiKey: process.env.API_KEY_MEMORIAS,
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 8000,
    },
];

const normalizarLista = (valor) => {
    if (Array.isArray(valor)) {
        return valor.filter((item) => typeof item === 'string' && item.trim());
    }

    if (typeof valor === 'string' && valor.trim()) {
        return [valor.trim()];
    }

    return [];
};

const extrairListaResposta = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== 'object') return [];

    const chavesPossiveis = ['data', 'dados', 'livros', 'results', 'conteudo', 'itens', 'books'];
    for (const chave of chavesPossiveis) {
        if (Array.isArray(payload[chave])) return payload[chave];
    }
    return [];
};

const pegarPrimeiroValor = (item, chaves, valorPadrao = null) => {
    for (const chave of chaves) {
        const valorAtual = item?.[chave];

        if (valorAtual !== undefined && valorAtual !== null && valorAtual !== '') {
            return valorAtual;
        }
    }

    return valorPadrao;
};

const normalizarLivro = (item) => ({
    ...item,
    titulo: pegarPrimeiroValor(
        item,
        [
            'tituloPT',
            'tituloPt',
            'titulo_pt',
            'titulo',
            'title',
            'nome',
            'nomeLivro',
            'obraPt',
            'obraPT',
        ],
        'Título não informado'
    ),
    titulo_pt: pegarPrimeiroValor(item, ['tituloPT', 'tituloPt', 'titulo_pt', 'titulo'], ''),
    tituloPt: pegarPrimeiroValor(item, ['tituloPT', 'tituloPt', 'titulo_pt', 'titulo'], ''),
    tituloPT: pegarPrimeiroValor(item, ['tituloPT', 'tituloPt', 'titulo_pt', 'titulo'], ''),
    titulo_en: pegarPrimeiroValor(item, ['tituloEN', 'tituloEn', 'titulo_en', 'titulo'], ''),
    tituloEn: pegarPrimeiroValor(item, ['tituloEN', 'tituloEn', 'titulo_en', 'titulo'], ''),
    tituloEN: pegarPrimeiroValor(item, ['tituloEN', 'tituloEn', 'titulo_en', 'titulo'], ''),
    autor: pegarPrimeiroValor(item, ['autor', 'author', 'nomeAutor'], 'Autor não informado'),
    capa_url: pegarPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto'],
        null
    ),
    capaUrl: pegarPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto'],
        null
    ),
    capaURl: pegarPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto'],
        null
    ),
    ano: pegarPrimeiroValor(item, ['ano', 'year', 'ano_publicacao'], 'N/A'),
    anoPublicacao: pegarPrimeiroValor(
        item,
        ['anoPublicacao', 'ano', 'year', 'ano_publicacao'],
        'N/A'
    ),
    genero_pt: pegarPrimeiroValor(
        item,
        ['generoPT', 'generoPt', 'genero_pt', 'genero', 'genre_pt', 'categoria', 'category'],
        'Gênero não informado'
    ),
    generoPt: pegarPrimeiroValor(
        item,
        ['generoPT', 'generoPt', 'genero_pt', 'genero', 'genre_pt', 'categoria', 'category'],
        'Gênero não informado'
    ),
    generoPT: pegarPrimeiroValor(
        item,
        ['generoPT', 'generoPt', 'genero_pt', 'genero', 'genre_pt', 'categoria', 'category'],
        'Gênero não informado'
    ),
    genero_en: pegarPrimeiroValor(
        item,
        ['generoEN', 'generoEn', 'genero_en', 'genre', 'category_en'],
        'Genre not informed'
    ),
    generoEn: pegarPrimeiroValor(
        item,
        ['generoEN', 'generoEn', 'genero_en', 'genre', 'category_en'],
        'Genre not informed'
    ),
    generoEN: pegarPrimeiroValor(
        item,
        ['generoEN', 'generoEn', 'genero_en', 'genre', 'category_en'],
        'Genre not informed'
    ),
    enredo_pt: pegarPrimeiroValor(
        item,
        [
            'descricaoPT',
            'descricaoPt',
            'descricao_pt',
            'enredo_pt',
            'resumo',
            'sinopse',
            'summary',
            'description_pt',
        ],
        'Enredo não informado'
    ),
    enredoPt: pegarPrimeiroValor(
        item,
        [
            'descricaoPT',
            'descricaoPt',
            'descricao_pt',
            'enredo_pt',
            'resumo',
            'sinopse',
            'summary',
            'description_pt',
        ],
        'Enredo não informado'
    ),
    descricaoPT: pegarPrimeiroValor(
        item,
        [
            'descricaoPT',
            'descricaoPt',
            'descricao_pt',
            'enredo_pt',
            'resumo',
            'sinopse',
            'summary',
            'description_pt',
        ],
        'Enredo não informado'
    ),
    descricaoPt: pegarPrimeiroValor(
        item,
        [
            'descricaoPT',
            'descricaoPt',
            'descricao_pt',
            'enredo_pt',
            'resumo',
            'sinopse',
            'summary',
            'description_pt',
        ],
        'Enredo não informado'
    ),
    descricao: pegarPrimeiroValor(
        item,
        [
            'descricaoPT',
            'descricaoPt',
            'descricao_pt',
            'enredo_pt',
            'resumo',
            'sinopse',
            'summary',
            'description_pt',
        ],
        'Enredo não informado'
    ),
    enredo_en: pegarPrimeiroValor(
        item,
        ['descricaoEN', 'descricaoEn', 'descricao_en', 'enredo_en', 'description', 'summary_en'],
        'Description not informed'
    ),
    enredoEn: pegarPrimeiroValor(
        item,
        ['descricaoEN', 'descricaoEn', 'descricao_en', 'enredo_en', 'description', 'summary_en'],
        'Description not informed'
    ),
    descricaoEN: pegarPrimeiroValor(
        item,
        ['descricaoEN', 'descricaoEn', 'descricao_en', 'enredo_en', 'description', 'summary_en'],
        'Description not informed'
    ),
    descricaoEn: pegarPrimeiroValor(
        item,
        ['descricaoEN', 'descricaoEn', 'descricao_en', 'enredo_en', 'description', 'summary_en'],
        'Description not informed'
    ),
    fotoAutor: pegarPrimeiroValor(item, ['fotoAutor', 'foto_autor', 'authorPhoto', 'foto'], null),
    fotoPersonagens: normalizarLista(
        pegarPrimeiroValor(item, ['fotoPersonagens', 'foto_personagens', 'fotosPersonagens'], [])
    ),
    fotosCuriosidades: normalizarLista(
        pegarPrimeiroValor(
            item,
            ['fotosCuriosidades', 'fotos_curiosidades', 'fotosCuriosidade'],
            []
        )
    ),
    fotoAutorUrl: pegarPrimeiroValor(
        item,
        ['fotoAutor', 'foto_autor', 'authorPhoto', 'foto'],
        null
    ),
    fotoAutorURL: pegarPrimeiroValor(
        item,
        ['fotoAutor', 'foto_autor', 'authorPhoto', 'foto'],
        null
    ),
});

const montarCabecalhos = (fonte) => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    if (!fonte.requerApiKey || !fonte.apiKey) return headers;

    switch (fonte.authType) {
        case 'bearer':
            headers.Authorization = `Bearer ${fonte.apiKey}`;
            break;
        case 'query':
            break;
        case 'header':
        default:
            const headerName = fonte.authHeaderName || 'x-api-key';
            headers[headerName] = fonte.apiKey;
            break;
    }
    return headers;
};

const consultarFonteBiblioteca = async (fonte) => {
    if (!fonte.urlCompleta) {
        return {
            id: fonte.id,
            livro: fonte.nomeLivro,
            statusApi: 'Não configurado',
            totalItens: 0,
            conteudo: null,
            erro: `Fonte ${fonte.nomeLivro} sem URL configurada.`,
        };
    }

    if (fonte.requerApiKey && !fonte.apiKey) {
        return {
            id: fonte.id,
            livro: fonte.nomeLivro,
            statusApi: 'Não configurado',
            totalItens: 0,
            conteudo: null,
            erro: `Fonte ${fonte.nomeLivro} sem API Key configurada.`,
        };
    }

    let urlFinal = fonte.urlCompleta;
    if (fonte.authType === 'query' && fonte.apiKey) {
        const separador = urlFinal.includes('?') ? '&' : '?';
        urlFinal += `${separador}api_key=${encodeURIComponent(fonte.apiKey)}`;
    }

    const controlador = new AbortController();
    const tempoLimiteMs = fonte.timeoutMs || 8000;
    const temporizador = setTimeout(() => controlador.abort(), tempoLimiteMs);

    try {
        const resposta = await fetch(urlFinal, {
            method: 'GET',
            headers: montarCabecalhos(fonte),
            signal: controlador.signal,
            cache: 'no-store',
        });

        if (!resposta.ok) {
            const textoErro = await resposta.text().catch(() => 'Sem detalhes');
            throw new Error(`Status ${resposta.status} - ${textoErro}`);
        }

        const dadosBrutos = await resposta.json();
        const itens = extrairListaResposta(dadosBrutos);
        const dadosFormatados = itens.map(normalizarLivro);

        return {
            id: fonte.id,
            livro: fonte.nomeLivro,
            statusApi: 'Online',
            totalItens: dadosFormatados.length,
            conteudo: dadosFormatados,
        };
    } catch (erro) {
        if (erro.name === 'AbortError') {
            throw new Error(`Timeout ao consultar ${fonte.nomeLivro} após ${tempoLimiteMs}ms`);
        }
        throw erro;
    } finally {
        clearTimeout(temporizador);
    }
};

export const obterBibliotecaCompleta = async (req, res) => {
    try {
        const bibliotecaCompleta = await Promise.all(
            fontesBiblioteca.map(async (fonte) => {
                try {
                    return await consultarFonteBiblioteca(fonte);
                } catch (erroFonte) {
                    console.error(`[Integração] ${fonte.nomeLivro} falhou:`, erroFonte.message);
                    return {
                        id: fonte.id,
                        livro: fonte.nomeLivro,
                        statusApi: 'Indisponível',
                        totalItens: 0,
                        conteudo: null,
                        erro: `Não foi possível consultar ${fonte.nomeLivro}: ${erroFonte.message}`,
                    };
                }
            })
        );

        return res.status(200).json(bibliotecaCompleta);
    } catch (error) {
        console.error('Erro crítico no agregador de biblioteca:', error.message);
        return res.status(500).json({ erro: 'Erro interno ao processar a biblioteca integrada.' });
    }
};
