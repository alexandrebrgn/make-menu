import { z } from "zod";

const Food = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
    category: z.string(),
    expiresAt: z.string().nullable(),
});

export type Food = z.infer<typeof Food>;

const CreateFoodDto = z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
    category: z.string(),
    expiresAt: z.string().nullable(),
});

export type CreateFoodDto = z.infer<typeof CreateFoodDto>;