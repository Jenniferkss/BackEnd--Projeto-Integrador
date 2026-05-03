import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({ id = null, titulo, imagens = null, preco = null ,autor,dataLancamento,descricao,reviews,contextoHistorico} = {}) {
        this.id = id;
        this.titulo = titulo;
        this.imagens = imagens;
        this.preco = preco;
        this.autor=autor;
        this.dataLancamento = dataLancamento;
        this.descricao = descricao;
        this.reviews = reviews;
        this.contextoHistorico = contextoHistorico;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                imagens:this.imagens,
                preco: this.preco,
                autor:this.autor,
                dataLancamento:this.dataLancamento,
                descricao:this.descricao,
                reviews:this.descricao,
                contextoHistorico:this.contextoHistorico
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: { 
                titulo: this.titulo,
                imagens:this.imagens,
                preco: this.preco,
                autor:this.autor,
                dataLancamento:this.dataLancamento,
                descricao:this.descricao,
                reviews:this.descricao,
                contextoHistorico:this.contextoHistorico },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.imagens !== undefined) {
            where.imagens = filtros.imagens === 'true';
        }
        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }
         if (filtros.autor !== undefined) {
            where.autor = filtros.autor === 'true';
        }
        if (filtros.dataLancamento !== undefined) {
            where.dataLancamento = parseFloat(filtros.dataLancamento);
        }
         if (filtros.descricao !== undefined) {
            where.descricao = filtros.descricao === 'true';
        }
        if (filtros.reviews !== undefined) {
            where.reviews = parseFloat(filtros.reviews);
        }
         if (filtros.contextoHistorico !== undefined) {
            where.contextoHistorico = filtros.contextoHistorico === 'true';
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
