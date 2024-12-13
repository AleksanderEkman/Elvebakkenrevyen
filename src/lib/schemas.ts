import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.union([
        z.string().regex(/^\d{8}$/, "Invalid phone number format"),
        z.literal("0"),
        z.literal("")
    ]).optional(),
    body: z.string().min(50).max(500)
});