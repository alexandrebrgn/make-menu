import { z } from "zod";

export const Recipie = z.object({
    id: z.string(),
    name: z.string(),
    markdown: z.string(),
});

export type Recipie = z.infer<typeof Recipie>;