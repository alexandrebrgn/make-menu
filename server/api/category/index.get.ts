import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
    try {
        const foods = await prisma.category.findMany();
        return foods;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erreur lors de la récupération des catégories ${error}`,
        });
    }
});