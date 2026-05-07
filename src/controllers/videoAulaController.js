import VideoAulaModel from '../models/VideoAulaModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisicao vazio. Envie os dados!' });
        }

        const { livroId, tituloPt, tituloEn, urlMidia, descricaoPt, descricaoEn } = req.body;
        const livroIdNumero = Number(livroId);

        if (!livroId) {
            return res.status(400).json({ error: 'O campo "livroId" e obrigatorio!' });
        }

        if (Number.isNaN(livroIdNumero)) {
            return res.status(400).json({ error: 'O campo "livroId" deve ser um numero valido!' });
        }

        if (!tituloPt) {
            return res.status(400).json({ error: 'O campo "tituloPt" e obrigatorio!' });
        }

        if (!tituloEn) {
            return res.status(400).json({ error: 'O campo "tituloEn" e obrigatorio!' });
        }

        if (!urlMidia) {
            return res.status(400).json({ error: 'O campo "urlMidia" e obrigatorio!' });
        }

        const videoAula = new VideoAulaModel({
            livroId: livroIdNumero,
            tituloPt,
            tituloEn,
            urlMidia,
            descricaoPt,
            descricaoEn,
        });

        const data = await videoAula.criar();

        return res.status(201).json({ message: 'Registro da videoaula criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await VideoAulaModel.buscarTodos(req.query);

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
            return res.status(400).json({ error: 'O ID enviado nao e um numero valido.' });
        }

        const videoAula = await VideoAulaModel.buscarPorId(parseInt(id));

        if (!videoAula) {
            return res.status(404).json({ error: 'Registro nao encontrado.' });
        }

        return res.status(200).json({ data: videoAula });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisicao vazio. Envie os dados!' });
        }

        const videoAula = await VideoAulaModel.buscarPorId(parseInt(id));

        if (!videoAula) {
            return res.status(404).json({ error: 'Registro nao encontrado para atualizar.' });
        }

        if (req.body.livroId !== undefined) {
            videoAula.livroId = req.body.livroId;
        }

        if (req.body.tituloPt !== undefined) {
            videoAula.tituloPt = req.body.tituloPt;
        }

        if (req.body.tituloEn !== undefined) {
            videoAula.tituloEn = req.body.tituloEn;
        }

        if (req.body.urlMidia !== undefined) {
            videoAula.urlMidia = req.body.urlMidia;
        }

        if (req.body.descricaoPt !== undefined) {
            videoAula.descricaoPt = req.body.descricaoPt;
        }

        if (req.body.descricaoEn !== undefined) {
            videoAula.descricaoEn = req.body.descricaoEn;
        }

        const data = await videoAula.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.tituloPt}" foi atualizado com sucesso!`, data });
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
            return res.status(400).json({ error: 'ID invalido.' });
        }

        const videoAula = await VideoAulaModel.buscarPorId(parseInt(id));

        if (!videoAula) {
            return res.status(404).json({ error: 'Registro nao encontrado para deletar.' });
        }

        await videoAula.deletar();

        return res.status(200).json({
            message: `O registro "${videoAula.tituloPt}" foi deletado com sucesso!`,
            deletado: videoAula,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
