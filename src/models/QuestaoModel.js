import prisma from '../lib/services/prismaClient.js';
import SimuladoModel from './SimuladoModel.js';

const criarErro = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default class QuestaoModel {
    constructor({
        id = null,
        simuladoId,
        perguntaPt,
        perguntaEn,
        respostaCorretaPt,
        respostaCorretaEn,
        explicacaoPt,
        explicacaoEn,
    } = {}) {
        this.id = id;
        this.simuladoId = simuladoId;
        this.perguntaPt = perguntaPt;
        this.perguntaEn = perguntaEn;
        this.respostaCorretaPt = respostaCorretaPt;
        this.respostaCorretaEn = respostaCorretaEn;
        this.explicacaoPt = explicacaoPt;
        this.explicacaoEn = explicacaoEn;
    }

    validarCampos() {
        if (!Number.isInteger(Number(this.simuladoId))) {
            throw criarErro(400, 'O campo "simuladoId" é obrigatório para uma questão!');
        }

        if (!this.perguntaPt) {
            throw criarErro(400, 'O campo "perguntaPt" é obrigatório para uma questão!');
        }

        if (!this.perguntaEn) {
            throw criarErro(400, 'O campo "perguntaEn" é obrigatório para uma questão!');
        }

        if (!this.respostaCorretaPt) {
            throw criarErro(400, 'O campo "respostaCorretaPt" é obrigatório para uma questão!');
        }

        if (!this.respostaCorretaEn) {
            throw criarErro(400, 'O campo "respostaCorretaEn" é obrigatório para uma questão!');
        }
    }

    async garantirSimuladoExiste() {
        const simulado = await SimuladoModel.buscarPorId(Number(this.simuladoId));

        if (!simulado) {
            throw criarErro(404, 'Simulado não encontrado.');
        }
    }

    async criar() {
        this.validarCampos();
        await this.garantirSimuladoExiste();

        return prisma.questao.create({
            data: {
                simuladoId: Number(this.simuladoId),
                perguntaPt: this.perguntaPt,
                perguntaEn: this.perguntaEn,
                respostaCorretaPt: this.respostaCorretaPt,
                respostaCorretaEn: this.respostaCorretaEn,
                explicacaoPt: this.explicacaoPt,
                explicacaoEn: this.explicacaoEn,
            },
        });
    }

    async atualizar() {
        this.validarCampos();
        await this.garantirSimuladoExiste();

        return prisma.questao.update({
            where: { id: this.id },
            data: {
                simuladoId: Number(this.simuladoId),
                perguntaPt: this.perguntaPt,
                perguntaEn: this.perguntaEn,
                respostaCorretaPt: this.respostaCorretaPt,
                respostaCorretaEn: this.respostaCorretaEn,
                explicacaoPt: this.explicacaoPt,
                explicacaoEn: this.explicacaoEn,
            },
        });
    }

    async deletar() {
        return prisma.questao.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.simuladoId !== undefined && filtros.simuladoId !== '') {
            const simuladoIdNumero = parseInt(filtros.simuladoId);
            if (!Number.isNaN(simuladoIdNumero)) {
                where.simuladoId = simuladoIdNumero;
            }
        }

        if (filtros.pergunta) {
            where.OR = [
                { perguntaPt: { contains: filtros.pergunta, mode: 'insensitive' } },
                { perguntaEn: { contains: filtros.pergunta, mode: 'insensitive' } },
            ];
        }

        return prisma.questao.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.questao.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new QuestaoModel(data);
    }
}
