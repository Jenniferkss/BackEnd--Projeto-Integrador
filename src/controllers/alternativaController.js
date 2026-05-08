import AlternativaModel from '../models/AlternativaModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { questaoId, textoPt, textoEn } = req.body;
        const questaoIdNumero = Number(questaoId);

        if (!questaoId) {
            return res.status(400).json({ error: 'O campo "questaoId" é obrigatório!' });
        }

        if (Number.isNaN(questaoIdNumero)) {
            return res
                .status(400)
                .json({ error: 'O campo "questaoId" deve ser um número válido!' });
        }

        const alternativa = new AlternativaModel({
            questaoId: questaoIdNumero,
            textoPt,
            textoEn,
        });

        const data = await alternativa.criar();

        return res.status(201).json({
            message: `Registro de alternativa criado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await AlternativaModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const alternativa = await AlternativaModel.buscarPorId(parseInt(id));

        if (!alternativa) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: alternativa });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const alternativa = await AlternativaModel.buscarPorId(parseInt(id));

        if (!alternativa) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.questaoId !== undefined) {
            const questaoIdNumero = Number(req.body.questaoId);

            if (Number.isNaN(questaoIdNumero)) {
                return res
                    .status(400)
                    .json({ error: 'O campo "questaoId" deve ser um número válido!' });
            }

            alternativa.questaoId = questaoIdNumero;
        }

        if (req.body.textoPt !== undefined) {
            alternativa.textoPt = req.body.textoPt;
        }

        if (req.body.textoEn !== undefined) {
            alternativa.textoEn = req.body.textoEn;
        }

        const data = await alternativa.atualizar();

        return res.status(200).json({
            message: `O registro da alternativa foi atualizado com sucesso!`,
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

        const alternativa = await AlternativaModel.buscarPorId(parseInt(id));

        if (!alternativa) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await alternativa.deletar();

        return res.status(200).json({
            message: `O registro da alternativa foi deletado com sucesso!`,
            deletado: alternativa,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
