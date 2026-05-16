import fs from 'fs/promises';
import LivroModel from '../models/LivroModel.js';
import { processarFoto, removerFoto } from '../lib/helpers/fotoHelper.js';

export const uploadFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma foto enviada.' });
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID enviado é um numero inválido.' });
        }

        const livro = await LivroModel.buscarPorId(Number(id));

        if (!livro) {
            removerFoto(req.file.path);
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        if (livro.capaURl) {
            await fs.unlink(livro.capaURl).catch(() => {});
        }

        livro.capaURl = await processarFoto(req.file.path);
        await livro.atualizar();

        return res.json({ message: 'Foto enviada e processada com sucesso!', livro });
    } catch (error) {
        console.error('Erro ao processar a foto:', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao processar a foto.' });
    }
};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID enviado é um numero inválido.' });
        }

        const livro = await LivroModel.buscarPorId(Number(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        if (!livro.capaURl) {
            return res.status(404).json({ error: 'Foto não encontrada para este livro.' });
        }

        return res.sendFile(livro.capaURl, { root: '.' });
    } catch (error) {
        console.error('Erro ao buscar a foto:', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar a foto.' });
    }
};