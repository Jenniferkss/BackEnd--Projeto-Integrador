import ReviewsModel from '../models/ReviewsModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const review = new ReviewsModel(req.body);

        const data = await review.criar();

        return res.status(201).json({ message: 'Review do livro criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar a Review.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await ReviewsModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhuma Review encontrada.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar review.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const review = await ReviewsModel.buscarPorId(parseInt(id));

        if (!review) {
            return res.status(404).json({ error: 'Review não encontrada.' });
        }

        return res.status(200).json({ data: review });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar review.' });
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

        const review = await ReviewsModel.buscarPorId(parseInt(id));

        if (!review) {
            return res.status(404).json({ error: 'Review não encontrada para atualizar.' });
        }

        Object.assign(review, req.body);

        const data = await review.atualizar();

        return res.status(200).json({ message: 'Review atualizada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao atualizar review.',
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const review = await ReviewsModel.buscarPorId(parseInt(id));

        if (!review) {
            return res.status(404).json({ error: 'Review não encontrada para deletar.' });
        }

        await review.deletar();

        return res.status(200).json({
            message: `A review de ID ${review.id} foi deletada com sucesso!`,
            deletado: review,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar review.',
        });
    }
};
