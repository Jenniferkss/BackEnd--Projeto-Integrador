import DicaVestibularModel from '../models/DicaVestibularModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const dica = new DicaVestibularModel(req.body);

        const data = await dica.criar();

        return res
            .status(201)
            .json({ message: 'Registro de dica de vestibular criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await DicaVestibularModel.buscarTodos(req.query);

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

        const dica = await DicaVestibularModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: dica });
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

        const dica = await DicaVestibularModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        Object.assign(dica, req.body);

        const data = await dica.atualizar();

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

        const dica = await DicaVestibularModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await dica.deletar();

        return res.status(200).json({
            message: `O registro "${dica.tituloPt}" foi deletado com sucesso!`,
            deletado: dica,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar registro.',
        });
    }
};
