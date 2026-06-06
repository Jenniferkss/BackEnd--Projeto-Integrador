import ConteudoVestibularModel from '../models/ConteudoVestibularModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const conteudo = new ConteudoVestibularModel(req.body);

        const data = await conteudo.criar();

        return res
            .status(201)
            .json({ message: 'Conteúdo vestibular criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await ConteudoVestibularModel.buscarTodos(req.query);

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

export const buscarPorLivro = async (req, res) => {
    try {
        const { livroId } = req.query;

        if (!livroId) {
            return res.status(400).json({ error: 'Parâmetro livroId é obrigatório.' });
        }

        const conteudo = await ConteudoVestibularModel.buscarPorLivroId(livroId);

        if (!conteudo) {
            return res.status(404).json({ error: 'Conteúdo não encontrado para este livro.' });
        }

        return res.status(200).json({ data: conteudo });
    } catch (error) {
        console.error('Erro ao buscar por livro:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao buscar conteúdo.',
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const conteudo = await ConteudoVestibularModel.buscarPorId(parseInt(id));

        if (!conteudo) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: conteudo });
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

        const conteudo = await ConteudoVestibularModel.buscarPorId(parseInt(id));

        if (!conteudo) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        Object.assign(conteudo, req.body);

        const data = await conteudo.atualizar();

        return res.status(200).json({
            message: `O registro foi atualizado com sucesso!`,
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

        const conteudo = await ConteudoVestibularModel.buscarPorId(parseInt(id));

        if (!conteudo) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await conteudo.deletar();

        return res.status(200).json({
            message: 'Registro deletado com sucesso.',
            deletado: conteudo,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar registro.',
        });
    }
};