import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
    // Le middleware auth.ts a déjà vérifié le token et ajouté event.context.user
    const userId = event.context.user.id;

    const body = await readBody(event);

    if (
        !body.name ||
        !body.quantity ||
        !body.unit ||
        !body.category
    ) {
        throw createError({
            statusCode: 400,
            statusMessage: "Champs requis manquants",
        });
    }

    try {
        const newFood = await prisma.food.create({
            data: {
                name: body.name,
                quantity: body.quantity,
                unit: body.unit,
                expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
                category: body.category,
                userId: userId, // Utiliser l'ID de l'utilisateur connecté
            },
        });

        return newFood;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la création de l'aliment",
        });
    }
});