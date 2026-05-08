import prisma from '../lib/services/prismaClient.js';
import LivroModel from './LivroModel.js';

const criarErro = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default class CuriosidadeModel {
    constructor({ id = null, livroId, tituloPt, tituloEn, conteudoPt, conteudoEn } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.tituloPt = tituloPt;
        this.tituloEn = tituloEn;
        this.conteudoPt = conteudoPt;
        this.conteudoEn = conteudoEn;
    }

    validarCampos() {
        if (!Number.isInteger(Number(this.livroId))) {
            throw criarErro(400, 'O campo "livroId" é obrigatório para uma curiosidade!');
        }

        if (!this.tituloPt) {
            throw criarErro(400, 'O campo "tituloPt" é obrigatório para uma curiosidade!');
        }

        if (!this.tituloEn) {
            throw criarErro(400, 'O campo "tituloEn" é obrigatório para uma curiosidade!');
        }

        if (!this.conteudoPt) {
            throw criarErro(400, 'O campo "conteudoPt" é obrigatório para uma curiosidade!');
        }

        if (!this.conteudoEn) {
            throw criarErro(400, 'O campo "conteudoEn" é obrigatório para uma curiosidade!');
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

        return prisma.curiosidade.create({
            data: {
                livroId: Number(this.livroId),
                tituloPt: this.tituloPt,
                tituloEn: this.tituloEn,
                conteudoPt: this.conteudoPt,
                conteudoEn: this.conteudoEn,
            },
        });
    }

    async atualizar() {
        this.validarCampos();
        await this.garantirLivroExiste();

        return prisma.curiosidade.update({
            where: { id: this.id },
            data: {
                livroId: Number(this.livroId),
                tituloPt: this.tituloPt,
                tituloEn: this.tituloEn,
                conteudoPt: this.conteudoPt,
                conteudoEn: this.conteudoEn,
            },
        });
    }

    async deletar() {
        return prisma.curiosidade.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.livroId !== undefined && filtros.livroId !== '') {
            const livroIdNumero = parseInt(filtros.livroId);
            if (!Number.isNaN(livroIdNumero)) {
                where.livroId = livroIdNumero;
            }
        }

        if (filtros.titulo) {
            where.OR = [
                { tituloPt: { contains: filtros.titulo, mode: 'insensitive' } },
                { tituloEn: { contains: filtros.titulo, mode: 'insensitive' } },
            ];
        }

        if (filtros.conteudo) {
            where.OR = [
                ...(where.OR || []),
                { conteudoPt: { contains: filtros.conteudo, mode: 'insensitive' } },
                { conteudoEn: { contains: filtros.conteudo, mode: 'insensitive' } },
            ];
        }

        return prisma.curiosidade.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.curiosidade.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new CuriosidadeModel(data);
    }
}
