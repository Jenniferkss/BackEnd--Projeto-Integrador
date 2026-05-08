import QuestaoModel from '../models/QuestaoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            simuladoId,
            perguntaPt,
            perguntaEn,
            respostaCorretaPt,
            respostaCorretaEn,
            explicacaoPt,
            explicacaoEn,
        } = req.body;
        const simuladoIdNumero = Number(simuladoId);

        if (!simuladoId) {
            return res.status(400).json({ error: 'O campo "simuladoId" é obrigatório!' });
        }

        if (Number.isNaN(simuladoIdNumero)) {
            return res
                .status(400)
                .json({ error: 'O campo "simuladoId" deve ser um número válido!' });
        }

        if (!perguntaPt) {
            return res.status(400).json({ error: 'O campo "perguntaPt" é obrigatório!' });
        }

        if (!perguntaEn) {
            return res.status(400).json({ error: 'O campo "perguntaEn" é obrigatório!' });
        }

        if (!respostaCorretaPt) {
            return res.status(400).json({ error: 'O campo "respostaCorretaPt" é obrigatório!' });
        }

        if (!respostaCorretaEn) {
            return res.status(400).json({ error: 'O campo "respostaCorretaEn" é obrigatório!' });
        }

        const questao = new QuestaoModel({
            simuladoId: simuladoIdNumero,
            perguntaPt,
            perguntaEn,
            respostaCorretaPt,
            respostaCorretaEn,
            explicacaoPt,
            explicacaoEn,
        });

        const data = await questao.criar();

        return res.status(201).json({ message: 'Registro de questão criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await QuestaoModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao buscar registros.',
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: questao });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao buscar registro.',
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.simuladoId !== undefined) {
            const simuladoIdNumero = Number(req.body.simuladoId);

            if (Number.isNaN(simuladoIdNumero)) {
                return res
                    .status(400)
                    .json({ error: 'O campo "simuladoId" deve ser um número válido!' });
            }

            questao.simuladoId = simuladoIdNumero;
        }

        if (req.body.perguntaPt !== undefined) {
            questao.perguntaPt = req.body.perguntaPt;
        }

        if (req.body.perguntaEn !== undefined) {
            questao.perguntaEn = req.body.perguntaEn;
        }

        if (req.body.respostaCorretaPt !== undefined) {
            questao.respostaCorretaPt = req.body.respostaCorretaPt;
        }

        if (req.body.respostaCorretaEn !== undefined) {
            questao.respostaCorretaEn = req.body.respostaCorretaEn;
        }

        if (req.body.explicacaoPt !== undefined) {
            questao.explicacaoPt = req.body.explicacaoPt;
        }

        if (req.body.explicacaoEn !== undefined) {
            questao.explicacaoEn = req.body.explicacaoEn;
        }

        const data = await questao.atualizar();

        return res.status(200).json({
            message: `O registro "${data.perguntaPt}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao atualizar registro.',
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await questao.deletar();

        return res.status(200).json({
            message: `O registro "${questao.perguntaPt}" foi deletado com sucesso!`,
            deletado: questao,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar registro.',
        });
    }
};
