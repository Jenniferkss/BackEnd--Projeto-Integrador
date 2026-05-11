import prisma from '../lib/services/prismaClient.js';

const criarErro = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default class LivroModel {
    constructor({
        id = null,
        tituloPT,
        tituloPt,
        tituloEN,
        tituloEn,
        titulo,
        capaURl,
        capaUrl,
        autor,
        anoPublicacao,
        generoPT,
        generoPt,
        generoEN,
        generoEn,
        genero,
        descricaoPT,
        descricaoPt,
        descricaoEN,
        descricaoEn,
        descricao,
        personagens,
        contextoHistoricoPT,
        contextoHistoricoPt,
        contextoHistoricoEN,
        contextoHistoricoEn,
        contextoHistorico,
        analisePT,
        analisePt,
        analiseEN,
        analiseEn,
        analise,
    } = {}) {
        this.id = id;
        this.tituloPT = tituloPT ?? tituloPt ?? titulo;
        this.tituloEN = tituloEN ?? tituloEn ?? titulo;
        this.capaURl = capaURl ?? capaUrl;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.generoPT = generoPT ?? generoPt ?? genero;
        this.generoEN = generoEN ?? generoEn ?? genero;
        this.descricaoPT = descricaoPT ?? descricaoPt ?? descricao;
        this.descricaoEN = descricaoEN ?? descricaoEn ?? descricao;
        this.personagens = Array.isArray(personagens)
            ? personagens
            : typeof personagens === 'string'
              ? personagens
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
              : personagens;
        this.contextoHistoricoPT = contextoHistoricoPT ?? contextoHistoricoPt ?? contextoHistorico;
        this.contextoHistoricoEN = contextoHistoricoEN ?? contextoHistoricoEn ?? contextoHistorico;
        this.analisePT = analisePT ?? analisePt ?? analise;
        this.analiseEN = analiseEN ?? analiseEn ?? analise;
    }

    validarCampos() {
        if (!this.tituloPT) {
            throw criarErro(400, 'O campo "tituloPT" é obrigatório para um livro!');
        }

        if (!this.tituloEN) {
            throw criarErro(400, 'O campo "tituloEN" é obrigatório para um livro!');
        }

        if (!this.autor) {
            throw criarErro(400, 'O campo "autor" é obrigatório para um livro!');
        }

        if (!this.generoPT) {
            throw criarErro(400, 'O campo "generoPT" é obrigatório para um livro!');
        }

        if (!this.generoEN) {
            throw criarErro(400, 'O campo "generoEN" é obrigatório para um livro!');
        }

        if (!this.descricaoPT) {
            throw criarErro(400, 'O campo "descricaoPT" é obrigatório para um livro!');
        }

        if (!this.descricaoEN) {
            throw criarErro(400, 'O campo "descricaoEN" é obrigatório para um livro!');
        }

        if (!Array.isArray(this.personagens) || this.personagens.length === 0) {
            throw criarErro(400, 'O campo "personagens" é obrigatório para um livro!');
        }

        if (!this.contextoHistoricoPT) {
            throw criarErro(400, 'O campo "contextoHistoricoPT" é obrigatório para um livro!');
        }

        if (!this.contextoHistoricoEN) {
            throw criarErro(400, 'O campo "contextoHistoricoEN" é obrigatório para um livro!');
        }

        if (!this.analisePT) {
            throw criarErro(400, 'O campo "analisePT" é obrigatório para um livro!');
        }

        if (!this.analiseEN) {
            throw criarErro(400, 'O campo "analiseEN" é obrigatório para um livro!');
        }

        if (
            this.anoPublicacao !== undefined &&
            this.anoPublicacao !== null &&
            this.anoPublicacao !== '' &&
            !Number.isInteger(Number(this.anoPublicacao))
        ) {
            throw criarErro(400, 'O campo "anoPublicacao" deve ser um número válido!');
        }
    }

    aplicarDados(dados = {}) {
        if (
            dados.tituloPT !== undefined ||
            dados.tituloPt !== undefined ||
            dados.titulo !== undefined
        ) {
            this.tituloPT = dados.tituloPT ?? dados.tituloPt ?? dados.titulo;
        }

        if (
            dados.tituloEN !== undefined ||
            dados.tituloEn !== undefined ||
            dados.titulo !== undefined
        ) {
            this.tituloEN = dados.tituloEN ?? dados.tituloEn ?? dados.titulo;
        }

        if (dados.capaURl !== undefined || dados.capaUrl !== undefined) {
            this.capaURl = dados.capaURl ?? dados.capaUrl;
        }

        if (dados.autor !== undefined) {
            this.autor = dados.autor;
        }

        if (dados.anoPublicacao !== undefined) {
            this.anoPublicacao = dados.anoPublicacao;
        }

        if (
            dados.generoPT !== undefined ||
            dados.generoPt !== undefined ||
            dados.genero !== undefined
        ) {
            this.generoPT = dados.generoPT ?? dados.generoPt ?? dados.genero;
        }

        if (
            dados.generoEN !== undefined ||
            dados.generoEn !== undefined ||
            dados.genero !== undefined
        ) {
            this.generoEN = dados.generoEN ?? dados.generoEn ?? dados.genero;
        }

        if (
            dados.descricaoPT !== undefined ||
            dados.descricaoPt !== undefined ||
            dados.descricao !== undefined
        ) {
            this.descricaoPT = dados.descricaoPT ?? dados.descricaoPt ?? dados.descricao;
        }

        if (
            dados.descricaoEN !== undefined ||
            dados.descricaoEn !== undefined ||
            dados.descricao !== undefined
        ) {
            this.descricaoEN = dados.descricaoEN ?? dados.descricaoEn ?? dados.descricao;
        }

        if (dados.personagens !== undefined) {
            this.personagens = Array.isArray(dados.personagens)
                ? dados.personagens
                : typeof dados.personagens === 'string'
                  ? dados.personagens
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean)
                  : dados.personagens;
        }

        if (
            dados.contextoHistoricoPT !== undefined ||
            dados.contextoHistoricoPt !== undefined ||
            dados.contextoHistorico !== undefined
        ) {
            this.contextoHistoricoPT =
                dados.contextoHistoricoPT ?? dados.contextoHistoricoPt ?? dados.contextoHistorico;
        }

        if (
            dados.contextoHistoricoEN !== undefined ||
            dados.contextoHistoricoEn !== undefined ||
            dados.contextoHistorico !== undefined
        ) {
            this.contextoHistoricoEN =
                dados.contextoHistoricoEN ?? dados.contextoHistoricoEn ?? dados.contextoHistorico;
        }

        if (
            dados.analisePT !== undefined ||
            dados.analisePt !== undefined ||
            dados.analise !== undefined
        ) {
            this.analisePT = dados.analisePT ?? dados.analisePt ?? dados.analise;
        }

        if (
            dados.analiseEN !== undefined ||
            dados.analiseEn !== undefined ||
            dados.analise !== undefined
        ) {
            this.analiseEN = dados.analiseEN ?? dados.analiseEn ?? dados.analise;
        }
    }

    normalizarAnoPublicacao() {
        if (
            this.anoPublicacao === undefined ||
            this.anoPublicacao === null ||
            this.anoPublicacao === ''
        ) {
            return undefined;
        }

        return Number(this.anoPublicacao);
    }

    async criar() {
        this.validarCampos();

        return prisma.livro.create({
            data: {
                tituloPT: this.tituloPT,
                tituloEN: this.tituloEN,
                capaURl: this.capaURl,
                autor: this.autor,
                anoPublicacao: this.normalizarAnoPublicacao(),
                generoPT: this.generoPT,
                generoEN: this.generoEN,
                descricaoPT: this.descricaoPT,
                descricaoEN: this.descricaoEN,
                personagens: this.personagens,
                contextoHistoricoPT: this.contextoHistoricoPT,
                contextoHistoricoEN: this.contextoHistoricoEN,
                analisePT: this.analisePT,
                analiseEN: this.analiseEN,
            },
        });
    }

    async atualizar() {
        this.validarCampos();

        return prisma.livro.update({
            where: { id: this.id },
            data: {
                tituloPT: this.tituloPT,
                tituloEN: this.tituloEN,
                capaURl: this.capaURl,
                autor: this.autor,
                anoPublicacao: this.normalizarAnoPublicacao(),
                generoPT: this.generoPT,
                generoEN: this.generoEN,
                descricaoPT: this.descricaoPT,
                descricaoEN: this.descricaoEN,
                personagens: this.personagens,
                contextoHistoricoPT: this.contextoHistoricoPT,
                contextoHistoricoEN: this.contextoHistoricoEN,
                analisePT: this.analisePT,
                analiseEN: this.analiseEN,
            },
        });
    }

    async deletar() {
        const simulados = await prisma.simulado.findMany({ where: { livroId: this.id } });
        for (const s of simulados) {
            const questoes = await prisma.questao.findMany({ where: { simuladoId: s.id } });
            for (const q of questoes) {
                await prisma.alternativa.deleteMany({ where: { questaoId: q.id } });
            }
            await prisma.questao.deleteMany({ where: { simuladoId: s.id } });
        }

        await prisma.simulado.deleteMany({ where: { livroId: this.id } });
        await prisma.review.deleteMany({ where: { livroId: this.id } });
        await prisma.videoaula.deleteMany({ where: { livroId: this.id } });
        await prisma.curiosidade.deleteMany({ where: { livroId: this.id } });
        await prisma.dicaVestibular.deleteMany({ where: { livroId: this.id } });

        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        const and = [];

        if (filtros.titulo) {
            and.push({
                OR: [
                    { tituloPT: { contains: filtros.titulo, mode: 'insensitive' } },
                    { tituloEN: { contains: filtros.titulo, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.autor) {
            and.push({ autor: { contains: filtros.autor, mode: 'insensitive' } });
        }

        if (filtros.anoPublicacao !== undefined && filtros.anoPublicacao !== '') {
            const anoPublicacaoNumero = parseInt(filtros.anoPublicacao);
            if (!Number.isNaN(anoPublicacaoNumero)) {
                and.push({ anoPublicacao: anoPublicacaoNumero });
            }
        }

        if (filtros.genero) {
            and.push({
                OR: [
                    { generoPT: { contains: filtros.genero, mode: 'insensitive' } },
                    { generoEN: { contains: filtros.genero, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.descricao) {
            and.push({
                OR: [
                    { descricaoPT: { contains: filtros.descricao, mode: 'insensitive' } },
                    { descricaoEN: { contains: filtros.descricao, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.contextoHistorico) {
            and.push({
                OR: [
                    {
                        contextoHistoricoPT: {
                            contains: filtros.contextoHistorico,
                            mode: 'insensitive',
                        },
                    },
                    {
                        contextoHistoricoEN: {
                            contains: filtros.contextoHistorico,
                            mode: 'insensitive',
                        },
                    },
                ],
            });
        }

        if (filtros.analise) {
            and.push({
                OR: [
                    { analisePT: { contains: filtros.analise, mode: 'insensitive' } },
                    { analiseEN: { contains: filtros.analise, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.personagens) {
            and.push({ personagens: { has: filtros.personagens } });
        }

        if (and.length > 0) {
            where.AND = and;
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.livro.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new LivroModel(data);
    }
}
