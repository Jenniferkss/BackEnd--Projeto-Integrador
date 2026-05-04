import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({
        id = null,
        tituloPt,
        tituloEn,
        capaUrl,
        autor,
        anoPublicacao,
        generoPt,
        generoEn,
        descricaoPt,
        descricaoEn,
        personagens,
        contextoHistoricoPt,
        contextoHistoricoEn,
        analisePt,
        analiseEN,
        reviews,
    } = {}) {
        this.id = id;
        this.tituloPT = tituloPt;
        this.tituloEN = tituloEn;
        this.capaUrl = capaUrl;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.generoPT = generoPt;
        this.generoEN = generoEn;
        this.descricaoPT = descricaoPt;
        this.descricaoEN = descricaoEn;
        this.personagens = personagens;
        this.contextoHistoricoPT = contextoHistoricoPt;
        this.contextoHistoricoEN = contextoHistoricoEn;
        this.analisePT = analisePt;
        this.analiseEN = analiseEN;
        this.reviews = reviews;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.tituloPT,
                titulo: this.tituloEN,
                capaUrl: this.capaUrl,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                generoPT: this.generoPT,
                generoEN: this.generoEN,
                descricaoPT: this.descricaoPT,
                descricaoEN: this.descricaoEN,
                personagens: this.personagens,
                contextoHistoricoPT: this.contextoHistoricoPT,
                contextoHistoricoEN: this.contextoHistoricoEN,
                reviews: this.descricao,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                titulo: this.tituloPT,
                capa: this.capaUrl,
                autor: this.autor,
                dataLancamento: this.dataLancamento,
                descricaoPT: this.descricaoPT,
                descricaoEN: this.descricaoEN,
                reviews: this.descricao,
                contextoHistoricoPt: this.contextoHistoricoPT,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.imagens !== undefined) {
            where.imagens = filtros.imagens === 'true';
        }
        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }
        if (filtros.autor !== undefined) {
            where.autor = filtros.autor === 'true';
        }
        if (filtros.dataLancamento !== undefined) {
            where.dataLancamento = parseFloat(filtros.dataLancamento);
        }
        if (filtros.descricao !== undefined) {
            where.descricao = filtros.descricao === 'true';
        }
        if (filtros.reviews !== undefined) {
            where.reviews = parseFloat(filtros.reviews);
        }
        if (filtros.contextoHistorico !== undefined) {
            where.contextoHistorico = filtros.contextoHistorico === 'true';
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
