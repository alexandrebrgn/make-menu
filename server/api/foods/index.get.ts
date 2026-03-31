import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
	try {
		const foods = await prisma.food.findMany({
			include: {
				user: true, // Inclure les informations de l'utilisateur si nécessaire
			},
		});

		return foods;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: "Erreur lors de la récupération des aliments",
		});
	}
});