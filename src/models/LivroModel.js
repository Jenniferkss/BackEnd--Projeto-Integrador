import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({
        id = null,
        tituloPT,
        tituloPt,
        tituloEN,
        tituloEn,
        titulo,
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
    } = {}) {
        this.id = id;
        this.tituloPT = tituloPT ?? tituloPt ?? titulo;
        this.tituloEN = tituloEN ?? tituloEn ?? titulo;
        this.capaURl = capaURl ?? capaUrl;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.generoPT = generoPT ?? generoPt ?? genero;
        this.generoEN = generoEN ?? generoEn ?? genero;
        this.descricaoPT = descricaoPT ?? descricaoPt ?? descricao;
        this.descricaoEN = descricaoEN ?? descricaoEn ?? descricao;
        this.personagens = personagens;
        this.contextoHistoricoPT = contextoHistoricoPT ?? contextoHistoricoPt ?? contextoHistorico;
        this.contextoHistoricoEN = contextoHistoricoEN ?? contextoHistoricoEn ?? contextoHistorico;
        this.analisePT = analisePT ?? analisePt ?? analise;
        this.analiseEN = analiseEN ?? analiseEn ?? analise;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                tituloPT: this.tituloPT,
                tituloEN: this.tituloEN,
                capaURl: this.capaURl,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                generoPT: this.generoPT,
                generoEN: this.generoEN,
                descricaoPT: this.descricaoPT,
                descricaoEN: this.descricaoEN,
                personagens: this.personagens,
                contextoHistoricoPT: this.contextoHistoricoPT,
                contextoHistoricoEN: this.contextoHistoricoEN,
                analisePT: this.analisePT,
                analiseEN: this.analiseEN,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                tituloPT: this.tituloPT,
                tituloEN: this.tituloEN,
                capaURl: this.capaURl,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                generoPT: this.generoPT,
                generoEN: this.generoEN,
                descricaoPT: this.descricaoPT,
                descricaoEN: this.descricaoEN,
                personagens: this.personagens,
                contextoHistoricoPT: this.contextoHistoricoPT,
                contextoHistoricoEN: this.contextoHistoricoEN,
                analisePT: this.analisePT,
                analiseEN: this.analiseEN,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        const and = [];

        if (filtros.titulo) {
            and.push({
                OR: [
                    { tituloPT: { contains: filtros.titulo, mode: 'insensitive' } },
                    { tituloEN: { contains: filtros.titulo, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.autor) {
            and.push({ autor: { contains: filtros.autor, mode: 'insensitive' } });
        }

        if (filtros.anoPublicacao !== undefined && filtros.anoPublicacao !== '') {
            const anoPublicacaoNumero = parseInt(filtros.anoPublicacao);
            if (!Number.isNaN(anoPublicacaoNumero)) {
                and.push({ anoPublicacao: anoPublicacaoNumero });
            }
        }

        if (filtros.genero) {
            and.push({
                OR: [
                    { generoPT: { contains: filtros.genero, mode: 'insensitive' } },
                    { generoEN: { contains: filtros.genero, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.descricao) {
            and.push({
                OR: [
                    { descricaoPT: { contains: filtros.descricao, mode: 'insensitive' } },
                    { descricaoEN: { contains: filtros.descricao, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.contextoHistorico) {
            and.push({
                OR: [
                    {
                        contextoHistoricoPT: {
                            contains: filtros.contextoHistorico,
                            mode: 'insensitive',
                        },
                    },
                    {
                        contextoHistoricoEN: {
                            contains: filtros.contextoHistorico,
                            mode: 'insensitive',
                        },
                    },
                ],
            });
        }

        if (filtros.analise) {
            and.push({
                OR: [
                    { analisePT: { contains: filtros.analise, mode: 'insensitive' } },
                    { analiseEN: { contains: filtros.analise, mode: 'insensitive' } },
                ],
            });
        }

        if (filtros.personagens) {
            and.push({ personagens: { has: filtros.personagens } });
        }

        if (and.length > 0) {
            where.AND = and;
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const idNumero = parseInt(id);

        if (Number.isNaN(idNumero)) {
            return null;
        }

        const data = await prisma.livro.findUnique({ where: { id: idNumero } });

        if (!data) {
            return null;
        }

        return new LivroModel(data);
    }
}
