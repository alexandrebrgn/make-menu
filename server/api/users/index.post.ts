import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (
		!body.firstName ||
		!body.lastName
	) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing required fields",
		});
	}

	const newUser = await prisma.user.create({
		data: {
            firstname: body.firstName,
            lastname: body.lastName,
		},
	});

    console.log("DATABASE_URL", process.env.DATABASE_URL);

	return newUser;
});
