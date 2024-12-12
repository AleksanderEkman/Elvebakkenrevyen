import { z } from "zod";

export const contactSchema = z.object({
    firstName: z.string().min(2).max(40),
    lastName: z.string().min(2).max(40),
    email: z.string().email(),
    body: z.string().min(30).max(500)
});