import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
	const userId = event.context.user.id;
	const id = Number(getRouterParam(event, 'id'));

	if (!id) {
		throw createError({ statusCode: 400, statusMessage: "ID invalide" });
	}

	try {
		const food = await prisma.food.findFirst({ where: { id, userId } });
		if (!food) {
			throw createError({ statusCode: 404, statusMessage: "Aliment introuvable" });
		}
		await prisma.food.delete({ where: { id } });
		return { success: true };
	} catch (error) {
		if ((error as any).statusCode) throw error;
		throw createError({ statusCode: 500, statusMessage: "Erreur lors de la suppression" });
	}
});
