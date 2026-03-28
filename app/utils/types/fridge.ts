import { z } from "zod";

const FridgeItem = z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
    expirationDate: z.string().optional(),
});

export type FridgeItem = z.infer<typeof FridgeItem>;