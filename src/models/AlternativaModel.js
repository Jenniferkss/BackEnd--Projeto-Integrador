import prisma from '../lib/services/prismaClient.js';
import QuestaoModel from './QuestaoModel.js';

const criarErro = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export default class AlternativaModel {
    constructor({ id = null, questaoId, textoPt, textoEn } = {}) {
        this.id = id;
        this.questaoId = questaoId;
        this.textoPt = textoPt;
        this.textoEn = textoEn;
    }

    validarCampos() {
        if (!Number.isInteger(Number(this.questaoId))) {
            throw criarErro(400, 'O campo "questaoId" é obrigatório para uma alternativa!');
        }
    }

    async garantirQuestaoExiste() {
        const questao = await QuestaoModel.buscarPorId(Number(this.questaoId));

        if (!questao) {
            throw criarErro(404, 'Questão não encontrada.');
        }
    }

    async criar() {
        this.validarCampos();
        await this.garantirQuestaoExiste();

        return prisma.alternativa.create({
            data: {
                questaoId: Number(this.questaoId),
                textoPt: this.textoPt,
                textoEn: this.textoEn,
            },
        });
    }

    async atualizar() {
        this.validarCampos();
        await this.garantirQuestaoExiste();

        return prisma.alternativa.update({
            where: { id: this.id },
            data: {
                questaoId: Number(this.questaoId),
                textoPt: this.textoPt,
                textoEn: this.textoEn,
            },
        });
    }

    async deletar() {
        return prisma.alternativa.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.questaoId !== undefined && filtros.questaoId !== '') {
            const questaoIdNumero = parseInt(filtros.questaoId);
            if (!Number.isNaN(questaoIdNumero)) {
                where.questaoId = questaoIdNumero;
            }
        }

        if (filtros.texto) {
            where.OR = [
                { textoPt: { contains: filtros.texto, mode: 'insensitive' } },
                { textoEn: { contains: filtros.texto, mode: 'insensitive' } },
            ];
        }

        return prisma.alternativa.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.alternativa.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new AlternativaModel(data);
    }
}
