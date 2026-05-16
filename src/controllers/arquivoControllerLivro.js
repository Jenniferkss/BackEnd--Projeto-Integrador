import LivroModel from '../models/LivroModel.js';
import prisma from '../lib/services/prismaClient.js';
import { upload as uploadStorage, deletar as deletarStorage } from '../lib/helpers/arquivoHelper.js';

const garantirColunaFotoAutor = async () => {
    await prisma.$executeRawUnsafe(`
        ALTER TABLE "livro"
        ADD COLUMN IF NOT EXISTS "fotoAutor" TEXT
    `);
};

const uploadArquivo = (tipo) => async (req, res) => {
    try {
        if (tipo === 'fotoAutor') {
            await garantirColunaFotoAutor();
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        }

        if (livro[tipo]) {
            await deletarStorage(livro[tipo]);
        }

        const urlArquivo = await uploadStorage(id, req.file);

        await prisma.livro.update({
            where: { id: Number(id) },
            data: {
                [tipo]: urlArquivo,
            },
        });

        return res.status(200).json({
            message: `${tipo} enviado com sucesso!`,
            url: urlArquivo,
        });
    } catch (error) {
        console.error(`Erro ao fazer upload do ${tipo}:`, error);
        return res.status(500).json({
            error: `Erro ao fazer upload do ${tipo}.`,
            detail: error.message,
        });
    }
};

const buscarArquivo = (tipo) => async (req, res) => {
    try {
        if (tipo === 'fotoAutor') {
            await garantirColunaFotoAutor();
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        if (!livro[tipo]) {
            return res.status(404).json({ error: `Nenhum ${tipo} cadastrado.` });
        }

        return res.status(200).json({
            url: livro[tipo],
        });
    } catch (error) {
        console.error(`Erro ao buscar ${tipo}:`, error);
        return res.status(500).json({
            error: `Erro ao buscar ${tipo}.`,
            detail: error.message,
        });
    }
};

const deletarArquivo = (tipo) => async (req, res) => {
    try {
        if (tipo === 'fotoAutor') {
            await garantirColunaFotoAutor();
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        if (!livro[tipo]) {
            return res.status(404).json({ error: `Nenhum ${tipo} para remover.` });
        }

        await deletarStorage(livro[tipo]);

        await prisma.livro.update({
            where: { id: Number(id) },
            data: {
                [tipo]: null,
            },
        });

        return res.status(200).json({
            message: `${tipo} removido com sucesso!`,
        });
    } catch (error) {
        console.error(`Erro ao remover ${tipo}:`, error);
        return res.status(500).json({
            error: `Erro ao remover ${tipo}.`,
            detail: error.message,
        });
    }
};

export const uploadFoto = uploadArquivo('fotoAutor');
export const buscarFoto = buscarArquivo('fotoAutor');
export const deletarFoto = deletarArquivo('fotoAutor');
