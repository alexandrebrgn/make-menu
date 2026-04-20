import { z } from "zod";

const FoodReference = z.object({
    id: z.number(),
    name: z.string(),
    categoryId: z.number(),
    unit: z.string().nullable(),
    defaultQuantity: z.number().nullable(),
    description: z.string().nullable(),
    slug: z.string().nullable(),
});

export type FoodReference = z.infer<typeof FoodReference>;
