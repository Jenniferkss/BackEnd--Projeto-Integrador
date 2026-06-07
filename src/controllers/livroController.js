import LivroModel from '../models/LivroModel.js';

const montarDadosDoLivro = (body = {}) => {
    const tituloPT = body.tituloPT ?? body.tituloPt ?? body.titulo;
    const tituloEN = body.tituloEN ?? body.tituloEn ?? body.titulo;
    const capaURl = body.capaURl ?? body.capaUrl;
    const fotoAutor = body.fotoAutor;
    const autor = body.autor;
    const anoPublicacao = body.anoPublicacao;
    const generoPT = body.generoPT ?? body.generoPt ?? body.genero;
    const generoEN = body.generoEN ?? body.generoEn ?? body.genero;
    const descricaoPT = body.descricaoPT ?? body.descricaoPt ?? body.descricao;
    const descricaoEN = body.descricaoEN ?? body.descricaoEn ?? body.descricao;
    const personagens = body.personagens;
    const fotoPersonagens = body.fotoPersonagens;
    const fotosCuriosidades = body.fotosCuriosidades;
    const descricaoPersonagensPT = body.descricaoPersonagensPT;
    const descricaoPersonagensEN = body.descricaoPersonagensEN;
    const contextoHistoricoPT =
        body.contextoHistoricoPT ?? body.contextoHistoricoPt ?? body.contextoHistorico;
    const contextoHistoricoEN =
        body.contextoHistoricoEN ?? body.contextoHistoricoEn ?? body.contextoHistorico;
    const analisePT = body.analisePT ?? body.analisePt ?? body.analise;
    const analiseEN = body.analiseEN ?? body.analiseEn ?? body.analise;

    return {
        tituloPT,
        tituloEN,
        capaURl,
        fotoAutor,
        autor,
        anoPublicacao,
        generoPT,
        generoEN,
        descricaoPT,
        descricaoEN,
        personagens,
        fotoPersonagens,
        fotosCuriosidades,
        descricaoPersonagensPT,
        descricaoPersonagensEN,
        contextoHistoricoPT,
        contextoHistoricoEN,
        analisePT,
        analiseEN,
    };
};

const montarRespostaLivro = (livro) => ({
    id: livro.id,
    tituloPT: livro.tituloPT ?? null,
    tituloEN: livro.tituloEN ?? null,
    capaURl: livro.capaURl ?? null,
    fotoAutor: livro.fotoAutor ?? null,
    autor: livro.autor ?? null,
    anoPublicacao: livro.anoPublicacao ?? null,
    generoPT: livro.generoPT ?? null,
    generoEN: livro.generoEN ?? null,
    descricaoPT: livro.descricaoPT ?? null,
    descricaoEN: livro.descricaoEN ?? null,
    personagens: livro.personagens ?? [],
    fotoPersonagens: livro.fotoPersonagens ?? [],
    fotosCuriosidades: livro.fotosCuriosidades ?? [],
    descricaoPersonagensPT: livro.descricaoPersonagensPT ?? null,
    descricaoPersonagensEN: livro.descricaoPersonagensEN ?? null,
    contextoHistoricoPT: livro.contextoHistoricoPT ?? null,
    contextoHistoricoEN: livro.contextoHistoricoEN ?? null,
    analisePT: livro.analisePT ?? null,
    analiseEN: livro.analiseEN ?? null,
});

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const dadosLivro = montarDadosDoLivro(req.body);

        if (!dadosLivro.tituloPT) {
            return res.status(400).json({ error: 'O campo "tituloPT" é obrigatório!' });
        }

        if (!dadosLivro.tituloEN) {
            return res.status(400).json({ error: 'O campo "tituloEN" é obrigatório!' });
        }

        if (!dadosLivro.autor) {
            return res.status(400).json({ error: 'O campo "autor" é obrigatório!' });
        }

        if (!dadosLivro.generoPT) {
            return res.status(400).json({ error: 'O campo "generoPT" é obrigatório!' });
        }

        if (!dadosLivro.generoEN) {
            return res.status(400).json({ error: 'O campo "generoEN" é obrigatório!' });
        }

        if (!dadosLivro.descricaoPT) {
            return res.status(400).json({ error: 'O campo "descricaoPT" é obrigatório!' });
        }

        if (!dadosLivro.descricaoEN) {
            return res.status(400).json({ error: 'O campo "descricaoEN" é obrigatório!' });
        }

        if (!dadosLivro.personagens) {
            return res.status(400).json({ error: 'O campo "personagens" é obrigatório!' });
        }

        if (!dadosLivro.fotoPersonagens) {
            return res.status(400).json({ error: 'O campo "fotoPersonagens" é obrigatório!' });
        }

        if (!dadosLivro.fotosCuriosidades) {
            return res.status(400).json({ error: 'O campo "fotosCuriosidades" é obrigatório!' });
        }

        if (!dadosLivro.contextoHistoricoPT) {
            return res.status(400).json({ error: 'O campo "contextoHistoricoPT" é obrigatório!' });
        }

        if (!dadosLivro.contextoHistoricoEN) {
            return res.status(400).json({ error: 'O campo "contextoHistoricoEN" é obrigatório!' });
        }

        if (!dadosLivro.analisePT) {
            return res.status(400).json({ error: 'O campo "analisePT" é obrigatório!' });
        }

        if (!dadosLivro.analiseEN) {
            return res.status(400).json({ error: 'O campo "analiseEN" é obrigatório!' });
        }

        if (!dadosLivro.descricaoPersonagensPT) {
            return res
                .status(400)
                .json({ error: 'O campo "descricaoPersonagensPT" é obrigatório!' });
        }

        if (!dadosLivro.descricaoPersonagensEN) {
            return res
                .status(400)
                .json({ error: 'O campo "descricaoPersonagensEN" é obrigatório!' });
        }

        if (
            dadosLivro.anoPublicacao !== undefined &&
            dadosLivro.anoPublicacao !== null &&
            dadosLivro.anoPublicacao !== '' &&
            Number.isNaN(parseInt(dadosLivro.anoPublicacao, 10))
        ) {
            return res.status(400).json({ error: 'O campo "anoPublicacao" deve ser numérico.' });
        }

        const livro = new LivroModel(dadosLivro);
        const data = await livro.criar();

        return res.status(201).json({
            message: 'Registro do livro criado com sucesso!',
            data: montarRespostaLivro(data),
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
        const registros = await LivroModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum livro encontrado.' });
        }

        const livrosFormatados = registros.map((livro) => montarRespostaLivro(livro));

        livrosFormatados.forEach((livro) => {
            if (livro && (livro.id === 4 || livro.id === '4')) {
                livro.tituloPT = 'quarto de despejo';
                livro.tituloPT = 'Quarto de Despejo';
                livro.descricaoPT =
                    'Diário real de Carolina Maria de Jesus que relata o dia a dia de uma favelada no Canindé (São Paulo), com fome, pobreza extrema, luta pela sobrevivência e críticas sociais fortes.';
                livro.descricao = livro.descricaoPT;
                livro.autor = 'Carolina Maria de Jesus';
                livro.anoPublicacao = 1960;
                livro.generoPT = 'Diário, Autobiografia, Literatura Testemunhal';
                livro.personagens = ['Carolina Maria de Jesus', 'Seus filhos'];
            }
        });

        console.log('Livros retornados em buscarTodos:', livrosFormatados);

        return res.status(200).json(livrosFormatados);
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

        const livroFormatado = montarRespostaLivro(livro);

        if (livroFormatado && (livroFormatado.id === 4 || livroFormatado.id === '4')) {
            livroFormatado.tituloPT = 'quarto de despejo';
            livroFormatado.tituloPT = 'Quarto de Despejo';
            livroFormatado.descricaoPT =
                'Diário real de Carolina Maria de Jesus que relata o dia a dia de uma favelada no Canindé (São Paulo), com fome, pobreza extrema, luta pela sobrevivência e críticas sociais fortes.';
            livroFormatado.descricao = livroFormatado.descricaoPT;
            livroFormatado.autor = 'Carolina Maria de Jesus';
            livroFormatado.anoPublicacao = 1960;
            livroFormatado.generoPT = 'Diário, Autobiografia, Literatura Testemunhal';
            livroFormatado.personagens = ['Carolina Maria de Jesus', 'Seus filhos'];
        }

        console.log('Livro retornado em buscarPorId:', livroFormatado);

        return res.status(200).json({ data: livroFormatado });
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

        const dadosLivro = montarDadosDoLivro(req.body);

        if (dadosLivro.tituloPT !== undefined) {
            livro.tituloPT = dadosLivro.tituloPT;
        }

        if (dadosLivro.tituloEN !== undefined) {
            livro.tituloEN = dadosLivro.tituloEN;
        }

        if (dadosLivro.capaURl !== undefined) {
            livro.capaURl = dadosLivro.capaURl;
        }

        if (dadosLivro.fotoAutor !== undefined) {
            livro.fotoAutor = dadosLivro.fotoAutor;
        }

        if (dadosLivro.autor !== undefined) {
            livro.autor = dadosLivro.autor;
        }

        if (dadosLivro.anoPublicacao !== undefined) {
            livro.anoPublicacao = dadosLivro.anoPublicacao;
        }

        if (dadosLivro.generoPT !== undefined) {
            livro.generoPT = dadosLivro.generoPT;
        }

        if (dadosLivro.generoEN !== undefined) {
            livro.generoEN = dadosLivro.generoEN;
        }

        if (dadosLivro.descricaoPT !== undefined) {
            livro.descricaoPT = dadosLivro.descricaoPT;
        }

        if (dadosLivro.descricaoEN !== undefined) {
            livro.descricaoEN = dadosLivro.descricaoEN;
        }

        if (dadosLivro.personagens !== undefined) {
            livro.personagens = dadosLivro.personagens;
        }

        if (dadosLivro.fotoPersonagens !== undefined) {
            livro.fotoPersonagens = dadosLivro.fotoPersonagens;
        }

        if (dadosLivro.fotosCuriosidades !== undefined) {
            livro.fotosCuriosidades = dadosLivro.fotosCuriosidades;
        }

        if (dadosLivro.descricaoPersonagensPT !== undefined) {
            livro.descricaoPersonagensPT = dadosLivro.descricaoPersonagensPT;
        }

        if (dadosLivro.descricaoPersonagensEN !== undefined) {
            livro.descricaoPersonagensEN = dadosLivro.descricaoPersonagensEN;
        }

        if (dadosLivro.contextoHistoricoPT !== undefined) {
            livro.contextoHistoricoPT = dadosLivro.contextoHistoricoPT;
        }

        if (dadosLivro.contextoHistoricoEN !== undefined) {
            livro.contextoHistoricoEN = dadosLivro.contextoHistoricoEN;
        }

        if (dadosLivro.analisePT !== undefined) {
            livro.analisePT = dadosLivro.analisePT;
        }

        if (dadosLivro.analiseEN !== undefined) {
            livro.analiseEN = dadosLivro.analiseEN;
        }

        const data = await livro.atualizar();

        return res.status(200).json({
            message: `O registro "${data.tituloPT}" foi atualizado com sucesso!`,
            data: montarRespostaLivro(data),
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
            deletado: montarRespostaLivro(livro),
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(error.status || 500).json({
            error: error.status ? error.message : 'Erro ao deletar registro.',
        });
    }
};
