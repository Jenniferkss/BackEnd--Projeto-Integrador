import prisma from '../lib/services/prismaClient.js';
import LivroModel from './LivroModel.js';

const criarErro = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default class SimuladoModel {
    constructor({ id = null, livroId, tituloPt, tituloEn } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.tituloPt = tituloPt;
        this.tituloEn = tituloEn;
    }

    validarCampos() {
        if (!Number.isInteger(Number(this.livroId))) {
            throw criarErro(400, 'O campo "livroId" é obrigatório para um simulado!');
        }

        if (!this.tituloPt) {
            throw criarErro(400, 'O campo "tituloPt" é obrigatório para um simulado!');
        }

        if (!this.tituloEn) {
            throw criarErro(400, 'O campo "tituloEn" é obrigatório para um simulado!');
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

        return prisma.simulado.create({
            data: {
                livroId: Number(this.livroId),
                tituloPt: this.tituloPt,
                tituloEn: this.tituloEn,
            },
        });
    }

    async atualizar() {
        this.validarCampos();
        await this.garantirLivroExiste();

        return prisma.simulado.update({
            where: { id: this.id },
            data: {
                livroId: Number(this.livroId),
                tituloPt: this.tituloPt,
                tituloEn: this.tituloEn,
            },
        });
    }

    async deletar() {
        return prisma.simulado.delete({ where: { id: this.id } });
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

        return prisma.simulado.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.simulado.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new SimuladoModel(data);
    }
}
