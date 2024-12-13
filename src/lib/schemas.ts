import { z } from "zod";

export const contactSchema = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    body: z.string().min(30).max(500)
});