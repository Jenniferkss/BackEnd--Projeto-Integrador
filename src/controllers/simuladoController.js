import SimuladoModel from '../models/SimuladoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const simulado = new SimuladoModel(req.body);

        const data = await simulado.criar();

        return res.status(201).json({ message: 'Registro de simulado criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await SimuladoModel.buscarTodos(req.query);

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

        const simulado = await SimuladoModel.buscarPorId(parseInt(id));

        if (!simulado) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: simulado });
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

        const simulado = await SimuladoModel.buscarPorId(parseInt(id));

        if (!simulado) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        Object.assign(simulado, req.body);

        const data = await simulado.atualizar();

        return res.status(200).json({
            message: `O registro "${data.tituloPt}" foi atualizado com sucesso!`,
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

        const simulado = await SimuladoModel.buscarPorId(parseInt(id));

        if (!simulado) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await simulado.deletar();

        return res.status(200).json({
            message: `O registro "${simulado.tituloPt}" foi deletado com sucesso!`,
            deletado: simulado,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar registro.',
        });
    }
};
