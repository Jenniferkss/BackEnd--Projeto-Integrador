import prisma from '../lib/services/prismaClient.js';

const erroValidacao = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default class EquipeModel {
    constructor({ id = null, nome, curso, objetivoPt, objetivoEn } = {}) {
        this.id = id;
        this.nome = nome;
        this.curso = curso;
        this.objetivoPt = objetivoPt;
        this.objetivoEn = objetivoEn;
    }

    validarCampos() {
        if (!this.nome) {
            throw erroValidacao(400, 'O campo "nome" é obrigatório para uma equipe!');
        }

        if (!this.curso) {
            throw erroValidacao(400, 'O campo "curso" é obrigatório para uma equipe!');
        }

        if (!this.objetivoPt) {
            throw erroValidacao(400, 'O campo "objetivoPt" é obrigatório para uma equipe!');
        }

        if (!this.objetivoEn) {
            throw erroValidacao(400, 'O campo "objetivoEn" é obrigatório para uma equipe!');
        }
    }

    async criar() {
        this.validarCampos();

        return prisma.equipe.create({
            data: {
                nome: this.nome,
                curso: this.curso,
                objetivoPt: this.objetivoPt,
                objetivoEn: this.objetivoEn,
            },
        });
    }

    async atualizar() {
        this.validarCampos();

        return prisma.equipe.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                curso: this.curso,
                objetivoPt: this.objetivoPt,
                objetivoEn: this.objetivoEn,
            },
        });
    }

    async deletar() {
        return prisma.equipe.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.curso) {
            where.curso = { contains: filtros.curso, mode: 'insensitive' };
        }

        if (filtros.objetivo) {
            where.OR = [
                { objetivoPt: { contains: filtros.objetivo, mode: 'insensitive' } },
                { objetivoEn: { contains: filtros.objetivo, mode: 'insensitive' } },
            ];
        }

        return prisma.equipe.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.equipe.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new EquipeModel(data);
    }
}
