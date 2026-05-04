import ReviewsModel from '../models/ReviewsModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { comentarioPt, livroId, autor,  comentarioEn, avaliacao } = req.body;

        const livroIdNumero = Number(livroId);
        const avaliacaoNumero = Number(avaliacao);

        if (!comentarioPt) {
            return res.status(400).json({ error: 'O campo "comentarioPt" é obrigatório para uma review!' });
        }
        if (!comentarioEn) {
    return res.status(400).json({ error: 'O campo "comentarioEn" é obrigatório para uma review!' });
}
        if (!autor) {   
            return res.status(400).json({ error: 'O campo "autor" é obrigatório para uma review!' });
        }
        if (!Number.isInteger(livroIdNumero)) {
    return res.status(400).json({ error: 'O campo "livroId" deve ser um número válido!' });
}
if (!Number.isInteger(avaliacaoNumero) || avaliacaoNumero < 1 || avaliacaoNumero > 5) {
    return res.status(400).json({ error: 'A avaliacao deve estar entre 1 e 5.' });
}

const livroExiste = await prisma.livro.findUnique({ where: { id: livroIdNumero } });

if (!livroExiste) {
    return res.status(404).json({ error: 'Livro não encontrado.' });
}

        const Review = new ReviewsModel({
    comentarioPt,
    comentarioEn,
    livroId: livroIdNumero,
    autor,
    avaliacao: avaliacaoNumero
});

const data = await Review.criar();

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
            return res.status(400).json({
                error: 'ID inválido.',
                success: 'false',
                status: 400,
                id: req.params.id
            });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const review = await ReviewsModel.buscarPorId(parseInt(id));

        if (!review) {
            return res.status(404).json({ error: 'Review não encontrada para atualizar.' });
        }

        if (req.body.comentarioPt !== undefined) {
            if (!req.body.comentarioPt) {
                return res.status(400).json({ error: 'comentarioPt não pode ser vazio.' });
            }
            review.comentarioPt = req.body.comentarioPt;
        }

        if (req.body.comentarioEn !== undefined) {
            if (!req.body.comentarioEn) {
                return res.status(400).json({ error: 'comentarioEn não pode ser vazio.' });
            }
            review.comentarioEn = req.body.comentarioEn;
        }

        if (req.body.autor !== undefined) {
            if (!req.body.autor) {
                return res.status(400).json({ error: 'autor não pode ser vazio.' });
            }
            review.autor = req.body.autor;
        }

        if (req.body.avaliacao !== undefined) {
            if (req.body.avaliacao < 1 || req.body.avaliacao > 5) {
                return res.status(400).json({ error: 'A avaliacao deve estar entre 1 e 5.' });
            }
            review.avaliacao = req.body.avaliacao;
        }

        const data = await review.atualizar();

        return res.status(200).json({ message: 'Review atualizada com sucesso!', data });
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

        const Review = await ReviewsModel.buscarPorId(parseInt(id));

        if (!Review) {
            return res.status(404).json({ error: 'Review não encontrada para deletar.' });
        }

        await Review.deletar();

        return res.status(200).json({ message: `A review "${Review.titulo}" foi deletada com sucesso!`, deletado: Review });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar review.' });
    }
};

