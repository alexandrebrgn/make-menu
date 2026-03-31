import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
	try {
		// Mettre à jour toutes les quantités à 0
		const result = await prisma.food.updateMany({
			data: {
				quantity: 0,
			},
		});

		return {
			success: true,
			message: `Quantités remises à zéro pour ${result.count} aliments`,
			updatedCount: result.count,
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: "Erreur lors de la remise à zéro des quantités",
		});
	}
});