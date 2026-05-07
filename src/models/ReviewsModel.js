import prisma from '../lib/services/prismaClient.js';

export default class ReviewsModel {
    constructor({ id = null, comentarioPt, comentarioEn, livroId, autor, avaliacao, data } = {}) {
        this.id = id;
        this.comentarioPt = comentarioPt;
        this.comentarioEn = comentarioEn;
        this.livroId = livroId;
        this.autor = autor;
        this.avaliacao = avaliacao;
        this.data = data;
    }

    async criar() {
        const data = {
            comentarioPt: this.comentarioPt,
            comentarioEn: this.comentarioEn,
            livroId: this.livroId,
            autor: this.autor,
            avaliacao: this.avaliacao,
        };

        if (this.data !== undefined && this.data !== null) {
            data.data = this.data;
        }

        return prisma.review.create({ data });
    }

    async atualizar() {
        const data = {
            comentarioPt: this.comentarioPt,
            comentarioEn: this.comentarioEn,
            livroId: this.livroId,
            autor: this.autor,
            avaliacao: this.avaliacao,
        };

        if (this.data !== undefined && this.data !== null) {
            data.data = this.data;
        }

        return prisma.review.update({
            where: { id: this.id },
            data,
        });
    }

    async deletar() {
        return prisma.review.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.livroId !== undefined && filtros.livroId !== '') {
            const livroIdNumero = parseInt(filtros.livroId);
            if (!Number.isNaN(livroIdNumero)) {
                where.livroId = livroIdNumero;
            }
        }

        if (filtros.autor) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }

        if (filtros.avaliacao !== undefined && filtros.avaliacao !== '') {
            const avaliacaoNumero = parseInt(filtros.avaliacao);
            if (!Number.isNaN(avaliacaoNumero)) {
                where.avaliacao = avaliacaoNumero;
            }
        }

        return prisma.review.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.review.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new ReviewsModel(data);
    }
}
