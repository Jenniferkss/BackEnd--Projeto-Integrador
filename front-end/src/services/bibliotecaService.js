import { request } from './api.js';

const BIBLIOTECA_PATH = '/api/integracao/biblioteca';

const normalizeText = (...values) => {
    for (const value of values) {
        if (typeof value === 'string' && value.trim()) {
            return value.trim();
        }

        if (typeof value === 'number' && Number.isFinite(value)) {
            return String(value);
        }
    }

    return '';
};

const normalizeImageList = (value) => {
    if (Array.isArray(value)) {
        return value.map((item) => (typeof item === 'string' ? item.trim() : '')).filter(Boolean);
    }

    if (typeof value === 'string' && value.trim()) {
        return [value.trim()];
    }

    return [];
};

const normalizeLivro = (livro) => {
    if (!livro || typeof livro !== 'object') {
        return null;
    }

    const tituloPt = normalizeText(
        livro.titulo_pt,
        livro.tituloPt,
        livro.tituloPT,
        livro.titulo,
        livro.nomePt,
        livro.nomePT,
        livro.obraPt,
        livro.obraPT
    );
    const tituloEn = normalizeText(
        livro.titulo_en,
        livro.tituloEn,
        livro.tituloEN,
        livro.titulo,
        livro.nomeEn,
        livro.nomeEN,
        livro.obraEn,
        livro.obraEN
    );
    const titulo = normalizeText(
        livro.titulo,
        livro.tituloPT,
        livro.tituloPt,
        livro.tituloEN,
        livro.tituloEn,
        livro.nome,
        livro.nomePt,
        livro.nomePT,
        livro.obra,
        livro.obraPt
    );

    const autor = normalizeText(livro.autor, livro.autora, livro.nomeAutor, livro.nomeAutora);
    const capaUrl = normalizeText(livro.capa_url, livro.capaUrl, livro.capaURl, livro.capaURL);
    const fotoAutor = normalizeText(
        livro.fotoAutor,
        livro.foto_autor,
        livro.fotoAutorUrl,
        livro.fotoAutorURL,
        livro.authorPhoto
    );
    const fotoPersonagens = normalizeImageList(
        livro.fotoPersonagens ?? livro.foto_personagens ?? livro.fotosPersonagens
    );
    const fotosCuriosidades = normalizeImageList(
        livro.fotosCuriosidades ?? livro.fotos_curiosidades ?? livro.fotosCuriosidade
    );
    const generoPt = normalizeText(livro.genero_pt, livro.generoPT, livro.generoPt, livro.genero);
    const generoEn = normalizeText(livro.genero_en, livro.generoEN, livro.generoEn, livro.genero);
    const enredoPt = normalizeText(
        livro.enredo_pt,
        livro.descricaoPT,
        livro.descricaoPt,
        livro.descricao,
        livro.conteudoPt
    );
    const enredoEn = normalizeText(
        livro.enredo_en,
        livro.descricaoEN,
        livro.descricaoEn,
        livro.descricao,
        livro.conteudoEn
    );

    const ano = livro.ano ?? livro.anoPublicacao ?? livro.ano_publicacao ?? '';

    return {
        ...livro,
        titulo,
        titulo_pt: tituloPt || titulo,
        titulo_en: tituloEn || titulo,
        autor,
        capa_url: capaUrl,
        fotoAutor,
        fotoPersonagens,
        fotosCuriosidades,
        genero_pt: generoPt,
        genero_en: generoEn,
        enredo_pt: enredoPt,
        enredo_en: enredoEn,
        ano,
    };
};

const normalizeError = (erro) => {
    if (!erro) {
        return '';
    }

    if (typeof erro === 'string') {
        return erro.trim();
    }

    if (typeof erro === 'object') {
        return normalizeText(erro.error, erro.message, erro.detail);
    }

    return String(erro);
};

const normalizeFonte = (fonte) => {
    if (!fonte || typeof fonte !== 'object') {
        return null;
    }

    const conteudo = Array.isArray(fonte.conteudo)
        ? fonte.conteudo.map(normalizeLivro).filter(Boolean)
        : [];

    const totalItens = Number(fonte.totalItens);

    return {
        ...fonte,
        conteudo,
        totalItens: Number.isFinite(totalItens) ? totalItens : conteudo.length,
        erro: normalizeError(fonte.erro),
        statusApi: normalizeText(fonte.statusApi),
    };
};

const normalizeResponse = (payload) => {
    if (Array.isArray(payload)) {
        return payload.map(normalizeFonte).filter(Boolean);
    }

    if (payload && typeof payload === 'object') {
        const possibleSources = payload.fontes ?? payload.data ?? payload.resultado;

        if (Array.isArray(possibleSources)) {
            return possibleSources.map(normalizeFonte).filter(Boolean);
        }
    }

    return [];
};

export async function fetchBiblioteca(signal) {
    const payload = await request(BIBLIOTECA_PATH, { signal });

    return normalizeResponse(payload);
}
