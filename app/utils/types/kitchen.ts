import { z } from "zod";

export const KitchenItem = z.object({
    id: z.string(),
    name: z.string(),
    info: z.string().optional(),
});

export type KitchenItem = z.infer<typeof KitchenItem>;