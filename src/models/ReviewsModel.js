import prisma from '../lib/services/prismaClient.js';
import LivroModel from './LivroModel.js';

const criarErro = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

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

    validarCampos() {
        if (!Number.isInteger(Number(this.livroId))) {
            throw criarErro(400, 'O campo "livroId" é obrigatório para uma review!');
        }

        if (!this.comentarioPt) {
            throw criarErro(400, 'O campo "comentarioPt" é obrigatório para uma review!');
        }

        if (!this.comentarioEn) {
            throw criarErro(400, 'O campo "comentarioEn" é obrigatório para uma review!');
        }

        if (!this.autor) {
            throw criarErro(400, 'O campo "autor" é obrigatório para uma review!');
        }

        const avaliacaoNumero = Number(this.avaliacao);

        if (!Number.isInteger(avaliacaoNumero) || avaliacaoNumero < 1 || avaliacaoNumero > 5) {
            throw criarErro(400, 'A avaliacao deve estar entre 1 e 5.');
        }
    }

    async garantirLivroExiste() {
        const livro = await LivroModel.buscarPorId(Number(this.livroId));

        if (!livro) {
            throw criarErro(404, 'Livro não encontrado.');
        }
    }

    async criar() {
        this.validarCampos();
        await this.garantirLivroExiste();

        const data = {
            comentarioPt: this.comentarioPt,
            comentarioEn: this.comentarioEn,
            livroId: Number(this.livroId),
            autor: this.autor,
            avaliacao: Number(this.avaliacao),
        };

        if (this.data !== undefined && this.data !== null) {
            data.data = this.data;
        }

        return prisma.review.create({ data });
    }

    async atualizar() {
        this.validarCampos();
        await this.garantirLivroExiste();

        const data = {
            comentarioPt: this.comentarioPt,
            comentarioEn: this.comentarioEn,
            livroId: Number(this.livroId),
            autor: this.autor,
            avaliacao: Number(this.avaliacao),
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
