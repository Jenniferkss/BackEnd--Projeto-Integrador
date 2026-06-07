const fontesBiblioteca = [
  //  Fontes do 2TDS2
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
      process.env.URL_LIVRO_O_GUARANI ||
      'https://bookpedia-backend-4ab3.onrender.com/livros',
    apiKey: process.env.API_KEY_O_GUARANI || 'bookpedia-backend-2026',
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
      'https://backend-projeto-integrador-rana.onrender.com/api/livro/6',
    apiKey: null,
    requerApiKey: false,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  },
  {
    id: 'memorias_bras_cubas',
    nomeLivro: 'Memórias Póstumas de Brás Cubas',
    urlCompleta:
      process.env.URL_LIVRO_MEMORIAS ||
      'https://projeto-clubyx.onrender.com/livros',
    apiKey: process.env.API_KEY_MEMORIAS || 'Clubyx_dev',
    requerApiKey: true,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  }, //  Fontes do 2TDS1
  {
    id: 'atividade_portugues',
    nomeLivro: 'Atividade Português',
    urlCompleta:
      process.env.URL_LIVRO_ATIVIDADE_PORTUGUES ||
      'https://atividade-portugues-backend.onrender.com/api/livro',
    apiKey: process.env.API_KEY_ATIVIDADE_PORTUGUES,
    requerApiKey: true,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  },
  {
    id: 'ratsjs',
    nomeLivro: 'RatsJS',
    urlCompleta:
      process.env.URL_LIVRO_RATSJS || 'https://ratsjs.onrender.com/api/livros',
    apiKey: process.env.API_KEY_RATSJS,
    requerApiKey: true,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  },
  {
    id: 'clube_livro',
    nomeLivro: 'Clube do Livro',
    urlCompleta:
      process.env.URL_LIVRO_CLUBE_LIVRO ||
      'https://clubelivro-backend.onrender.com/api/livros',
    apiKey: process.env.API_KEY_CLUBE_LIVRO,
    requerApiKey: true,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  },
  {
    id: 'olhos_dagua',
    nomeLivro: "Olhos d'Água",
    urlCompleta:
      process.env.URL_LIVRO_OLHOS_DAGUA ||
      'https://olhosdagua.onrender.com/api/livro',
    apiKey: process.env.API_KEY_OLHOS_DAGUA,
    requerApiKey: true,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  },
  {
    id: 'devstones',
    nomeLivro: 'DevStones',
    urlCompleta:
      process.env.URL_LIVRO_DEVSTONES ||
      'https://devstones-backend.onrender.com/api/livro/',
    apiKey: process.env.API_KEY_DEVSTONES,
    requerApiKey: true,
    authType: 'header',
    authHeaderName: 'x-api-key',
    timeoutMs: 8000,
  },
]


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
        const val = payload[chave];
        if (val && typeof val === 'object' && !Array.isArray(val) && val.id !== undefined) {
            return [val];
        }
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
            'tituloDoLivro',
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
    autor: (() => {
    const raw = pegarPrimeiroValor(item, ['autor', 'author', 'nomeAutor', 'autores', 'escritor', 'escritorDoLivro', 'autorDoLivro', 'autorNome', 'name'], null);
        if (Array.isArray(raw)) {
            const primeiro = raw[0];
            if (typeof primeiro === 'object' && primeiro !== null) {
                return primeiro.nome || primeiro.name || 'Autor não informado';
            }
            return String(primeiro || 'Autor não informado');
        }
        return raw || 'Autor não informado';
    })(),
    capa_url: pegarPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capaURL', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto', 'urlImagem', 'urlFoto', 'poster'],
        null
    ),
    capaUrl: pegarPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capaURL', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto', 'urlImagem', 'urlFoto', 'poster'],
        null
    ),
    capaURl: pegarPrimeiroValor(
        item,
        ['capaURl', 'capaUrl', 'capaURL', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto', 'urlImagem', 'urlFoto', 'poster'],
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

    if (!fonte.requerApiKey || !fonte.apiKey) {
        return headers;
    }

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
