// ✅ VERSÃO MELHORADA E ROBUSTA - Integração de Bibliotecas (Projeto Integrador)
// Autor original: equipe | Melhorias aplicadas: tratamento de config, consistência de env vars, clareza de status

const fontesBiblioteca = [
    {
        id: 'capitaes_arena',
        nomeLivro: 'Capitães da Areia',
        urlCompleta: process.env.URL_LIVRO_CAPITAES_DA_AREIA || 'https://readflow-m8o6.onrender.com/api/livros',
        apiKey: process.env.API_KEY_CAPITAES_DA_AREIA,
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 12000,
    },
    {
        id: 'o_guarani',
        nomeLivro: 'O Guarani',
        urlCompleta: process.env.URL_LIVRO_O_GUARANI || 'https://bookpedia-backend-4ab3.onrender.com/livros',
        apiKey: process.env.API_KEY_O_GUARANI,
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 12000,
    },
    {
        id: 'quartos_despejo',
        nomeLivro: 'Quarto de Despejo',
        urlCompleta: process.env.URL_LIVRO_QUARTOS_DESPEJO || 'https://backend-projeto-integrador-rana.onrender.com/api/livro',
        apiKey: process.env.API_KEY_QUARTOS_DESPEJO || 'amods', // usa env se existir, senão fallback 'amods'
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 12000,
    },
    {
        id: 'memorias_bras_cubas',
        nomeLivro: 'Memórias Póstumas de Brás Cubas',
        urlCompleta: process.env.URL_LIVRO_MEMORIAS || 'https://projeto-clubyx.onrender.com/livros',
        apiKey: process.env.API_KEY_MEMORIAS,
        requerApiKey: true,
        authType: 'header',
        authHeaderName: 'x-api-key',
        timeoutMs: 12000,
    },
];

// ==================== FUNÇÕES AUXILIARES (melhoradas) ====================

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
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== 'object') return [];

    const chavesPossiveis = ['data', 'dados', 'livros', 'results', 'conteudo', 'itens', 'books'];
    for (const chave of chavesPossiveis) {
        if (Array.isArray(payload[chave])) return payload[chave];
    }
    return [];
};

const normalizarLivro = (item) => ({
    titulo: obterPrimeiroValor(item, ['titulo', 'title', 'nome', 'nomeLivro'], 'Título não informado'),
    autor: obterPrimeiroValor(item, ['autor', 'author', 'nomeAutor'], 'Autor não informado'),
    capa_url: obterPrimeiroValor(item, ['capaURl', 'capaUrl', 'capa', 'image', 'cover', 'url_capa', 'imagem', 'foto'], null),
    ano: obterPrimeiroValor(item, ['ano', 'year', 'ano_publicacao'], 'N/A'),
    genero_pt: obterPrimeiroValor(item, ['genero_pt', 'genero', 'genre_pt', 'categoria', 'category'], 'Gênero não informado'),
    genero_en: obterPrimeiroValor(item, ['genero_en', 'genre', 'category_en'], 'Genre not informed'),
    enredo_pt: obterPrimeiroValor(item, ['enredo_pt', 'resumo', 'sinopse', 'summary', 'description_pt'], 'Enredo não informado'),
    enredo_en: obterPrimeiroValor(item, ['enredo_en', 'description', 'summary_en'], 'Description not informed'),
});

const montarCabecalhos = (fonte) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

// ==================== FUNÇÃO PRINCIPAL MELHORADA ====================

const consultarFonteBiblioteca = async (fonte) => {
    // NOVO: Tratamento claro de configuração ausente
    if (!fonte.urlCompleta) {
        return {
            id: fonte.id,
            livro: fonte.nomeLivro,
            statusApi: 'Não configurado',
            totalItens: 0,
            conteudo: null,
            erro: 'URL da fonte não definida (adicione URL_LIVRO_* no Render)',
        };
    }

    if (fonte.requerApiKey && !fonte.apiKey) {
        return {
            id: fonte.id,
            livro: fonte.nomeLivro,
            statusApi: 'Não configurado',
            totalItens: 0,
            conteudo: null,
            erro: 'API Key ausente (adicione API_KEY_* no Render)',
        };
    }

    let urlFinal = fonte.urlCompleta;
    if (fonte.authType === 'query' && fonte.apiKey) {
        const separador = urlFinal.includes('?') ? '&' : '?';
        urlFinal += `${separador}api_key=${encodeURIComponent(fonte.apiKey)}`;
    }

    const controlador = new AbortController();
    const tempoLimiteMs = fonte.timeoutMs || 12000;
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
            throw new Error(`Timeout após ${tempoLimiteMs}ms`);
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
                console.error(`[Integração] Falha em "${fonte.nomeLivro}":`, erroFonte.message);
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
        console.error('Erro crítico no agregador de biblioteca:', error.message);
        return res.status(500).json({ erro: 'Erro interno ao processar a biblioteca integrada.' });
    }
};