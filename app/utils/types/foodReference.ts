import { z } from "zod";

const FoodReference = z.object({
    id: z.number(),
    name: z.string(),
    category_id: z.number(),
    unit: z.string(),
    defaultQuantity: z.string(),
    description: z.string().nullable(),
    slug: z.string().nullable(),
});

export type FoodReference = z.infer<typeof FoodReference>;
