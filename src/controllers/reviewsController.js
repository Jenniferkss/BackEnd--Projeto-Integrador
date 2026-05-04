import ReviewsModel from '../models/ReviewsModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { Comentario } = req.body;

        if (!Comentario) {
            return res.status(400).json({ error: 'O campo "Comentario" é obrigatório para uma review!' });
        }
            return res.status(400).json({ error: 'O campo "autor" é obrigatório para uma review!' });
        }
        if (!) {
            return res.status(400).json({ error: 'O campo de  "data de lançamento" é obrigatório para uma review!' });
        }
        if (!) {
            return res.status(400).json({ error: 'O campo "descricao" é obrigatório para uma review!' });
        }

        const Review = new ReviewsModel({ });
        const data = await review.criar();

        return res.status(201).json({ message: 'Review do livro criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar a Review.' });
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

        const livro = await ReviewsModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Review não encontrada.' });
        }

        return res.status(200).json({ data: livro });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar review.' });
    }
};


export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                 error: 'ID inválido.',
                 success:'false',
                 status:400,
                 id:req.params.id
                });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const livro = await ReviewsModel.buscarPorId(parseInt(id));
//nao mudei essa parte
        if (!livro) {
            return res.status(404).json({ error: 'Review não encontrada para atualizar.' });
        }
        if (req.body.titulo !== undefined) {
            livro.titulo = req.body.titulo;
        }

        const data = await livro.atualizar();

        return res.status(200).json({ message: `A review "${data.titulo}" foi atualizada com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar review.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await ReviewsModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Review não encontrada para deletar.' });
        }

        await livro.deletar();

        return res.status(200).json({ message: `A review "${review.titulo}" foi deletada com sucesso!`, deletado: livro });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar review.' });
    }
};

