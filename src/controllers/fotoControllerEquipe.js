import fs from "fs/promises";
import EquipeModel from "../models/EquipeModel.js";
import { upload, processarFoto, removerFoto } from "../lib/helpers/fotoHelper.js";
import e from "express";

export const uploadFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma foto enviada." });
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID enviado é um numero inválido." });
        }

        const equipe = await EquipeModel.buscarPorId(Number(id));

        if (!equipe) {
            removerFoto(req.file.path);
            return res.status(404).json({ error: "Equipe não encontrada." });
        }

        if (equipe.foto) {
            await fs.unlink(equipe.foto).catch(() => {});
        }

        equipe.foto = await processarFoto(req.file.path);
        await equipe.atualizar();

        res.json({ message: "Foto enviada e processada com sucesso!", equipe });
    } catch (error) {
        console.error("Erro ao processar a foto:", error);
        res.status(500).json({ error: "Ocorreu um erro ao processar a foto." });
    }

};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID enviado é um numero inválido." });
        }

        const equipe = await EquipeModel.buscarPorId(Number(id));

        if (!equipe) return res.status(404).json({ error: "Equipe não encontrada." });

        if (!equipe.foto)
             return res.status(404).json({ error: "Foto não encontrada para esta equipe." });

        res.sendFile(equipe.foto, { root: "." });
    } catch (error) {
        console.error("Erro ao buscar a foto:", error);
        res.status(500).json({ error: "Ocorreu um erro ao buscar a foto." });
    }
};
