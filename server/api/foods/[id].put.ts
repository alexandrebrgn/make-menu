import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
	const userId = event.context.user.id;
	const id = Number(getRouterParam(event, 'id'));

	if (!id) {
		throw createError({ statusCode: 400, statusMessage: "ID invalide" });
	}

	const body = await readBody(event);

	try {
		const food = await prisma.food.findFirst({ where: { id, userId } });
		if (!food) {
			throw createError({ statusCode: 404, statusMessage: "Aliment introuvable" });
		}

		const updated = await prisma.food.update({
			where: { id },
			data: {
				name: body.name ?? food.name,
				quantity: body.quantity ?? food.quantity,
				unit: body.unit ?? food.unit,
				category: body.category ?? food.category,
				expiresAt: body.expiresAt !== undefined ? (body.expiresAt ? new Date(body.expiresAt) : null) : food.expiresAt,
			},
		});

		return updated;
	} catch (error) {
		if ((error as any).statusCode) throw error;
		throw createError({ statusCode: 500, statusMessage: "Erreur lors de la mise à jour" });
	}
});
