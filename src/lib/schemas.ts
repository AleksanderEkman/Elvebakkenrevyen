import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().optional().default('').refine(value => value === '' || /^\d{8}$/.test(value), {
        message: "Invalid phone number format"
    }),
    body: z.string().min(50).max(500),
    url: z.string().optional().default('')
});