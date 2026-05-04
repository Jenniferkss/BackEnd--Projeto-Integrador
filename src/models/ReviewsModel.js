import prisma from '../lib/services/prismaClient.js';

export default class ReviewsModel {
    constructor({ } = {}) {
        this.id = id;
        
    }

    async criar() {
        return prisma.reviews.create({
            data: {
               
            },
        });
    }

    async atualizar() {
        return prisma.reviews.update({
            where: { id: this.id },
            data: { 
                
        });
    }

    async deletar() {
        return prisma.reviews.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

       
        return prisma.reviews.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.reviews.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ReviewsModel(data);
    }
}
