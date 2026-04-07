import { z } from "zod";

const Category = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    slug: z.string().nullable(),
});

export type Category = z.infer<typeof Category>;
