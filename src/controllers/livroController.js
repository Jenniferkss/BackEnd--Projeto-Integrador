import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        if (!req.body.tituloPT && !req.body.tituloPt && !req.body.titulo) {
            return res.status(400).json({ error: 'O campo "tituloPT" é obrigatório!' });
        }

        if (!req.body.tituloEN && !req.body.tituloEn && !req.body.titulo) {
            return res.status(400).json({ error: 'O campo "tituloEN" é obrigatório!' });
        }

        if (!req.body.autor) {
            return res.status(400).json({ error: 'O campo "autor" é obrigatório!' });
        }

        if (!req.body.generoPT && !req.body.generoPt && !req.body.genero) {
            return res.status(400).json({ error: 'O campo "generoPT" é obrigatório!' });
        }

        if (!req.body.generoEN && !req.body.generoEn && !req.body.genero) {
            return res.status(400).json({ error: 'O campo "generoEN" é obrigatório!' });
        }

        if (!req.body.descricaoPT && !req.body.descricaoPt && !req.body.descricao) {
            return res.status(400).json({ error: 'O campo "descricaoPT" é obrigatório!' });
        }

        if (!req.body.descricaoEN && !req.body.descricaoEn && !req.body.descricao) {
            return res.status(400).json({ error: 'O campo "descricaoEN" é obrigatório!' });
        }

        if (!req.body.personagens) {
            return res.status(400).json({ error: 'O campo "personagens" é obrigatório!' });
        }

        if (!req.body.fotoPersonagens) {
            return res.status(400).json({ error: 'O campo "fotoPersonagens" é obrigatório!' });
        }

        if (!req.body.fotosCuriosidades) {
            return res.status(400).json({ error: 'O campo "fotosCuriosidades" é obrigatório!' });
        }

        if (
            !req.body.contextoHistoricoPT &&
            !req.body.contextoHistoricoPt &&
            !req.body.contextoHistorico
        ) {
            return res.status(400).json({ error: 'O campo "contextoHistoricoPT" é obrigatório!' });
        }

        if (
            !req.body.contextoHistoricoEN &&
            !req.body.contextoHistoricoEn &&
            !req.body.contextoHistorico
        ) {
            return res.status(400).json({ error: 'O campo "contextoHistoricoEN" é obrigatório!' });
        }

        if (!req.body.analisePT && !req.body.analisePt && !req.body.analise) {
            return res.status(400).json({ error: 'O campo "analisePT" é obrigatório!' });
        }

        if (!req.body.analiseEN && !req.body.analiseEn && !req.body.analise) {
            return res.status(400).json({ error: 'O campo "analiseEN" é obrigatório!' });
        }

        if (!req.body.descricaoPersonagensPT) {
            return res
                .status(400)
                .json({ error: 'O campo "descricaoPersonagensPT" é obrigatório!' });
        }

        if (!req.body.descricaoPersonagensEN) {
            return res
                .status(400)
                .json({ error: 'O campo "descricaoPersonagensEN" é obrigatório!' });
        }

        if (
            req.body.anoPublicacao !== undefined &&
            req.body.anoPublicacao !== null &&
            req.body.anoPublicacao !== '' &&
            Number.isNaN(parseInt(req.body.anoPublicacao, 10))
        ) {
            return res.status(400).json({ error: 'O campo "anoPublicacao" deve ser numérico.' });
        }

        const livro = new LivroModel(req.body);
        const data = await livro.criar();

        return res.status(201).json({ message: 'Registro do livro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro interno ao salvar o registro.',
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum livro encontrado.' });
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

        if (Number.isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id, 10));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
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

        if (Number.isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id, 10));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.tituloPT !== undefined) {
            livro.tituloPT = req.body.tituloPT;
        } else if (req.body.tituloPt !== undefined) {
            livro.tituloPT = req.body.tituloPt;
        } else if (req.body.titulo !== undefined) {
            livro.tituloPT = req.body.titulo;
        }

        if (req.body.tituloEN !== undefined) {
            livro.tituloEN = req.body.tituloEN;
        } else if (req.body.tituloEn !== undefined) {
            livro.tituloEN = req.body.tituloEn;
        } else if (req.body.titulo !== undefined) {
            livro.tituloEN = req.body.titulo;
        }

        if (req.body.autor !== undefined) {
            livro.autor = req.body.autor;
        }

        if (req.body.anoPublicacao !== undefined) {
            livro.anoPublicacao = req.body.anoPublicacao;
        }

        if (req.body.generoPT !== undefined) {
            livro.generoPT = req.body.generoPT;
        } else if (req.body.generoPt !== undefined) {
            livro.generoPT = req.body.generoPt;
        } else if (req.body.genero !== undefined) {
            livro.generoPT = req.body.genero;
        }

        if (req.body.generoEN !== undefined) {
            livro.generoEN = req.body.generoEN;
        } else if (req.body.generoEn !== undefined) {
            livro.generoEN = req.body.generoEn;
        } else if (req.body.genero !== undefined) {
            livro.generoEN = req.body.genero;
        }

        if (req.body.descricaoPT !== undefined) {
            livro.descricaoPT = req.body.descricaoPT;
        } else if (req.body.descricaoPt !== undefined) {
            livro.descricaoPT = req.body.descricaoPt;
        } else if (req.body.descricao !== undefined) {
            livro.descricaoPT = req.body.descricao;
        }

        if (req.body.descricaoEN !== undefined) {
            livro.descricaoEN = req.body.descricaoEN;
        } else if (req.body.descricaoEn !== undefined) {
            livro.descricaoEN = req.body.descricaoEn;
        } else if (req.body.descricao !== undefined) {
            livro.descricaoEN = req.body.descricao;
        }

        if (req.body.personagens !== undefined) {
            livro.personagens = req.body.personagens;
        }

        if (req.body.fotoPersonagens !== undefined) {
            livro.fotoPersonagens = req.body.fotoPersonagens;
        }

        if (req.body.fotosCuriosidades !== undefined) {
            livro.fotosCuriosidades = req.body.fotosCuriosidades;
        }

        if (req.body.contextoHistoricoPT !== undefined) {
            livro.contextoHistoricoPT = req.body.contextoHistoricoPT;
        } else if (req.body.contextoHistoricoPt !== undefined) {
            livro.contextoHistoricoPT = req.body.contextoHistoricoPt;
        } else if (req.body.contextoHistorico !== undefined) {
            livro.contextoHistoricoPT = req.body.contextoHistorico;
        }

        if (req.body.contextoHistoricoEN !== undefined) {
            livro.contextoHistoricoEN = req.body.contextoHistoricoEN;
        } else if (req.body.contextoHistoricoEn !== undefined) {
            livro.contextoHistoricoEN = req.body.contextoHistoricoEn;
        } else if (req.body.contextoHistorico !== undefined) {
            livro.contextoHistoricoEN = req.body.contextoHistorico;
        }

        if (req.body.analisePT !== undefined) {
            livro.analisePT = req.body.analisePT;
        } else if (req.body.analisePt !== undefined) {
            livro.analisePT = req.body.analisePt;
        } else if (req.body.analise !== undefined) {
            livro.analisePT = req.body.analise;
        }

        if (req.body.analiseEN !== undefined) {
            livro.analiseEN = req.body.analiseEN;
        } else if (req.body.analiseEn !== undefined) {
            livro.analiseEN = req.body.analiseEn;
        } else if (req.body.analise !== undefined) {
            livro.analiseEN = req.body.analise;
        }

        if (req.body.descricaoPersonagensPT !== undefined) {
            livro.descricaoPersonagensPT = req.body.descricaoPersonagensPT;
        }

        if (req.body.descricaoPersonagensEN !== undefined) {
            livro.descricaoPersonagensEN = req.body.descricaoPersonagensEN;
        }

        if (req.body.capaURl !== undefined) {
            livro.capaURl = req.body.capaURl;
        } else if (req.body.capaUrl !== undefined) {
            livro.capaURl = req.body.capaUrl;
        }

        if (req.body.fotoAutor !== undefined) {
            livro.fotoAutor = req.body.fotoAutor;
        }

        const data = await livro.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.tituloPT}" foi atualizado com sucesso!`, data });
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

        if (Number.isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id, 10));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res.status(200).json({
            message: `O registro "${livro.tituloPT}" foi deletado com sucesso!`,
            deletado: livro,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar registro.',
        });
    }
};
