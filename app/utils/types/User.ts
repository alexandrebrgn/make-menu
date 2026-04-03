import { z } from "zod";

export const User = z.object({
    id: z.string(),
    email: z.email(),
    firstname: z.string(),
    lastname: z.string(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    foodsCount: z.number().optional(),
});

export type User = z.infer<typeof User>;