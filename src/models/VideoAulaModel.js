import prisma from '../lib/services/prismaClient.js';

export default class VideoAulaModel {
    constructor({
        id = null,
        livroId,
        tituloPt,
        tituloEn,
        urlMidia,
        descricaoPt,
        descricaoEn,
    } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.tituloPt = tituloPt;
        this.tituloEn = tituloEn;
        this.urlMidia = urlMidia;
        this.descricaoPt = descricaoPt;
        this.descricaoEn = descricaoEn;
    }

    async criar() {
        return prisma.videoaula.create({
            data: {
                livroId: this.livroId,
                tituloPt: this.tituloPt,
                tituloEn: this.tituloEn,
                urlMidia: this.urlMidia,
                descricaoPt: this.descricaoPt,
                descricaoEn: this.descricaoEn,
            },
        });
    }

    async atualizar() {
        return prisma.videoaula.update({
            where: { id: this.id },
            data: {
                livroId: this.livroId,
                tituloPt: this.tituloPt,
                tituloEn: this.tituloEn,
                urlMidia: this.urlMidia,
                descricaoPt: this.descricaoPt,
                descricaoEn: this.descricaoEn,
            },
        });
    }

    async deletar() {
        return prisma.videoaula.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.livroId !== undefined && filtros.livroId !== '') {
            const livroIdNumero = parseInt(filtros.livroId);
            if (!Number.isNaN(livroIdNumero)) {
                where.livroId = livroIdNumero;
            }
        }

        if (filtros.titulo) {
            where.OR = [
                { tituloPt: { contains: filtros.titulo, mode: 'insensitive' } },
                { tituloEn: { contains: filtros.titulo, mode: 'insensitive' } },
            ];
        }

        if (filtros.urlMidia) {
            where.urlMidia = { contains: filtros.urlMidia, mode: 'insensitive' };
        }

        return prisma.videoaula.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.videoaula.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new VideoAulaModel(data);
    }
}
