import { prisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (
		!body.name ||
		!body.quantity ||
		!body.unit ||
		!body.category ||
		!body.userId
	) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing required fields",
		});
	}

	const newFood = await prisma.food.create({
		data: {
			name: body.name,
			quantity: body.quantity,
			unit: body.unit,
			expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
			category: body.category,
			userId: body.userId,
		},
	});

	return newFood;
});
