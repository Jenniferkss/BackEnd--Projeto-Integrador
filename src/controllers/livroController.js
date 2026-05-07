import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            tituloPT,
            tituloPt,
            titulo,
            tituloEN,
            tituloEn,
            capaURl,
            capaUrl,
            autor,
            anoPublicacao,
            generoPT,
            generoPt,
            generoEN,
            generoEn,
            genero,
            descricaoPT,
            descricaoPt,
            descricaoEN,
            descricaoEn,
            descricao,
            personagens,
            contextoHistoricoPT,
            contextoHistoricoPt,
            contextoHistoricoEN,
            contextoHistoricoEn,
            contextoHistorico,
            analisePT,
            analisePt,
            analiseEN,
            analiseEn,
            analise,
        } = req.body;

        const tituloPrincipal = tituloPT ?? tituloPt ?? titulo;
        const tituloSecundario = tituloEN ?? tituloEn ?? titulo;
        const generoPrincipal = generoPT ?? generoPt ?? genero;
        const generoSecundario = generoEN ?? generoEn ?? genero;
        const descricaoPrincipal = descricaoPT ?? descricaoPt ?? descricao;
        const descricaoSecundaria = descricaoEN ?? descricaoEn ?? descricao;
        const contextoPrincipal = contextoHistoricoPT ?? contextoHistoricoPt ?? contextoHistorico;
        const contextoSecundario = contextoHistoricoEN ?? contextoHistoricoEn ?? contextoHistorico;
        const analisePrincipal = analisePT ?? analisePt ?? analise;
        const analiseSecundaria = analiseEN ?? analiseEn ?? analise;
        const personagensLista = Array.isArray(personagens)
            ? personagens
            : typeof personagens === 'string'
              ? personagens
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
              : personagens;

        if (!tituloPrincipal)
            return res
                .status(400)
                .json({ error: 'O campo "tituloPT" é obrigatório para um livro!' });
        if (!tituloSecundario)
            return res
                .status(400)
                .json({ error: 'O campo "tituloEN" é obrigatório para um livro!' });
        if (!autor)
            return res.status(400).json({ error: 'O campo "autor" é obrigatório para um livro!' });
        if (!generoPrincipal)
            return res
                .status(400)
                .json({ error: 'O campo "generoPT" é obrigatório para um livro!' });
        if (!generoSecundario)
            return res
                .status(400)
                .json({ error: 'O campo "generoEN" é obrigatório para um livro!' });
        if (!descricaoPrincipal)
            return res
                .status(400)
                .json({ error: 'O campo "descricaoPT" é obrigatório para um livro!' });
        if (!descricaoSecundaria)
            return res
                .status(400)
                .json({ error: 'O campo "descricaoEN" é obrigatório para um livro!' });
        if (!contextoPrincipal)
            return res
                .status(400)
                .json({ error: 'O campo "contextoHistoricoPT" é obrigatório para um livro!' });
        if (!contextoSecundario)
            return res
                .status(400)
                .json({ error: 'O campo "contextoHistoricoEN" é obrigatório para um livro!' });
        if (!analisePrincipal)
            return res
                .status(400)
                .json({ error: 'O campo "analisePT" é obrigatório para um livro!' });
        if (!analiseSecundaria)
            return res
                .status(400)
                .json({ error: 'O campo "analiseEN" é obrigatório para um livro!' });
        if (!personagensLista || personagensLista.length === 0) {
            return res
                .status(400)
                .json({ error: 'O campo "personagens" é obrigatório para um livro!' });
        }

        if (
            anoPublicacao !== undefined &&
            anoPublicacao !== null &&
            anoPublicacao !== '' &&
            isNaN(Number(anoPublicacao))
        ) {
            return res
                .status(400)
                .json({ error: 'O campo "anoPublicacao" deve ser um número válido!' });
        }

        const livro = new LivroModel({
            tituloPT: tituloPrincipal,
            tituloEN: tituloSecundario,
            capaURl: capaURl ?? capaUrl,
            autor,
            anoPublicacao:
                anoPublicacao !== undefined && anoPublicacao !== null && anoPublicacao !== ''
                    ? parseInt(anoPublicacao)
                    : undefined,
            generoPT: generoPrincipal,
            generoEN: generoSecundario,
            descricaoPT: descricaoPrincipal,
            descricaoEN: descricaoSecundaria,
            personagens: personagensLista,
            contextoHistoricoPT: contextoPrincipal,
            contextoHistoricoEN: contextoSecundario,
            analisePT: analisePrincipal,
            analiseEN: analiseSecundaria,
        });
        const data = await livro.criar();

        return res.status(201).json({ message: 'Registro do livro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);

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

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
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

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (
            req.body.tituloPT !== undefined ||
            req.body.tituloPt !== undefined ||
            req.body.titulo !== undefined
        ) {
            const novoTituloPT = req.body.tituloPT ?? req.body.tituloPt ?? req.body.titulo;
            if (!novoTituloPT) {
                return res.status(400).json({ error: 'O campo "tituloPT" não pode ser vazio.' });
            }
            livro.tituloPT = novoTituloPT;
        }

        if (
            req.body.tituloEN !== undefined ||
            req.body.tituloEn !== undefined ||
            req.body.titulo !== undefined
        ) {
            const novoTituloEN = req.body.tituloEN ?? req.body.tituloEn ?? req.body.titulo;
            if (!novoTituloEN) {
                return res.status(400).json({ error: 'O campo "tituloEN" não pode ser vazio.' });
            }
            livro.tituloEN = novoTituloEN;
        }

        if (req.body.capaURl !== undefined || req.body.capaUrl !== undefined) {
            livro.capaURl = req.body.capaURl ?? req.body.capaUrl;
        }

        if (req.body.autor !== undefined) {
            if (!req.body.autor) {
                return res.status(400).json({ error: 'O campo "autor" não pode ser vazio.' });
            }
            livro.autor = req.body.autor;
        }

        if (req.body.anoPublicacao !== undefined) {
            const anoNumero = Number(req.body.anoPublicacao);
            if (!Number.isInteger(anoNumero)) {
                return res
                    .status(400)
                    .json({ error: 'O campo "anoPublicacao" deve ser um número válido!' });
            }
            livro.anoPublicacao = anoNumero;
        }

        if (
            req.body.generoPT !== undefined ||
            req.body.generoPt !== undefined ||
            req.body.genero !== undefined
        ) {
            const novoGeneroPT = req.body.generoPT ?? req.body.generoPt ?? req.body.genero;
            if (!novoGeneroPT) {
                return res.status(400).json({ error: 'O campo "generoPT" não pode ser vazio.' });
            }
            livro.generoPT = novoGeneroPT;
        }

        if (
            req.body.generoEN !== undefined ||
            req.body.generoEn !== undefined ||
            req.body.genero !== undefined
        ) {
            const novoGeneroEN = req.body.generoEN ?? req.body.generoEn ?? req.body.genero;
            if (!novoGeneroEN) {
                return res.status(400).json({ error: 'O campo "generoEN" não pode ser vazio.' });
            }
            livro.generoEN = novoGeneroEN;
        }

        if (
            req.body.descricaoPT !== undefined ||
            req.body.descricaoPt !== undefined ||
            req.body.descricao !== undefined
        ) {
            const novaDescricaoPT =
                req.body.descricaoPT ?? req.body.descricaoPt ?? req.body.descricao;
            if (!novaDescricaoPT) {
                return res.status(400).json({ error: 'O campo "descricaoPT" não pode ser vazio.' });
            }
            livro.descricaoPT = novaDescricaoPT;
        }

        if (
            req.body.descricaoEN !== undefined ||
            req.body.descricaoEn !== undefined ||
            req.body.descricao !== undefined
        ) {
            const novaDescricaoEN =
                req.body.descricaoEN ?? req.body.descricaoEn ?? req.body.descricao;
            if (!novaDescricaoEN) {
                return res.status(400).json({ error: 'O campo "descricaoEN" não pode ser vazio.' });
            }
            livro.descricaoEN = novaDescricaoEN;
        }

        if (req.body.personagens !== undefined) {
            const personagensLista = Array.isArray(req.body.personagens)
                ? req.body.personagens
                : typeof req.body.personagens === 'string'
                  ? req.body.personagens
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean)
                  : req.body.personagens;

            if (!personagensLista || personagensLista.length === 0) {
                return res.status(400).json({ error: 'O campo "personagens" não pode ser vazio.' });
            }

            livro.personagens = personagensLista;
        }

        if (
            req.body.contextoHistoricoPT !== undefined ||
            req.body.contextoHistoricoPt !== undefined ||
            req.body.contextoHistorico !== undefined
        ) {
            const novoContextoPT =
                req.body.contextoHistoricoPT ??
                req.body.contextoHistoricoPt ??
                req.body.contextoHistorico;
            if (!novoContextoPT) {
                return res
                    .status(400)
                    .json({ error: 'O campo "contextoHistoricoPT" não pode ser vazio.' });
            }
            livro.contextoHistoricoPT = novoContextoPT;
        }

        if (
            req.body.contextoHistoricoEN !== undefined ||
            req.body.contextoHistoricoEn !== undefined ||
            req.body.contextoHistorico !== undefined
        ) {
            const novoContextoEN =
                req.body.contextoHistoricoEN ??
                req.body.contextoHistoricoEn ??
                req.body.contextoHistorico;
            if (!novoContextoEN) {
                return res
                    .status(400)
                    .json({ error: 'O campo "contextoHistoricoEN" não pode ser vazio.' });
            }
            livro.contextoHistoricoEN = novoContextoEN;
        }

        if (
            req.body.analisePT !== undefined ||
            req.body.analisePt !== undefined ||
            req.body.analise !== undefined
        ) {
            const novaAnalisePT = req.body.analisePT ?? req.body.analisePt ?? req.body.analise;
            if (!novaAnalisePT) {
                return res.status(400).json({ error: 'O campo "analisePT" não pode ser vazio.' });
            }
            livro.analisePT = novaAnalisePT;
        }

        if (
            req.body.analiseEN !== undefined ||
            req.body.analiseEn !== undefined ||
            req.body.analise !== undefined
        ) {
            const novaAnaliseEN = req.body.analiseEN ?? req.body.analiseEn ?? req.body.analise;
            if (!novaAnaliseEN) {
                return res.status(400).json({ error: 'O campo "analiseEN" não pode ser vazio.' });
            }
            livro.analiseEN = novaAnaliseEN;
        }

        const data = await livro.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.tituloPT}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res
            .status(200)
            .json({
                message: `O registro "${livro.tituloPT}" foi deletado com sucesso!`,
                deletado: livro,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
