import prisma from '../lib/services/prismaClient.js';

export default class ReviewsModel {
    constructor({ 
        id = null, 
        comentarioPt, 
        comentarioEn, 
        livroId, 
        autor, 
        avaliacao, 
        data = null 
    } = {}) {
        this.id = id;
        this.comentarioPt = comentarioPt;
        this.comentarioEn = comentarioEn;
        this.livroId = livroId;
        this.autor = autor;
        this.avaliacao = avaliacao;
        this.data = data;
    }

    async criar() {
        return prisma.review.create({
            data: {
                comentarioPt: this.comentarioPt,
                comentarioEn: this.comentarioEn,
                livro: { connect: { id: this.livroId } },
                autor: this.autor,
                avaliacao: this.avaliacao,
                data: this.data
            },
        });
    }

    async atualizar() {
        return prisma.review.update({
            where: { id: this.id },
            data: { 
                comentarioPt: this.comentarioPt,
                comentarioEn: this.comentarioEn,
                autor: this.autor,
                avaliacao: this.avaliacao,
                data: this.data
            },
        });
    }

    async deletar() {
        return prisma.review.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        
        if (filtros.livroId) where.livroId = filtros.livroId;
        if (filtros.autor) where.autor = filtros.autor;
        if (filtros.avaliacao) where.avaliacao = filtros.avaliacao;
        
        return prisma.review.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.review.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ReviewsModel(data);
    }
}
