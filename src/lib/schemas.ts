import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	phone: z
		.string()
		.optional()
		.default('')
		.refine((value) => value === '' || /^\d{8}$/.test(value)),
	body: z.string().min(50).max(500),
	url: z.string().optional().default('')
});

export const newUserSchema = z
	.object({
		first_name: z
			.string()
			.min(3, { message: 'Fornavnet må være minst 3 tegn' })
			.max(20, { message: 'Fornavnet kan ikke være mer enn 20 tegn' })
			.regex(/^\S+$/, { message: 'Brukernavnet kan ikke inneholde mellomrom' }),
		email: z
			.string()
			.email({ message: 'E-postadressen er ugyldig' }),
		password: z
			.string()
			.min(10, { message: 'Må være minst 10 tegn' })
			.regex(/(?=.*[A-Z])(?=.*[a-z])/, { message: 'Må inneholde både små og store bokstaver' })
			.regex(/\d/, { message: 'Må inneholde minst ett tall' })
			.regex(/[@$!%*?&#-]/, { message: 'Må inneholde minst ett spesialtegn' }),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passordene er ikke like',
		path: ['confirmPassword']
	});

export const loginSchema = z
	.object({
		email: z
			.string()
			.email({ message: 'E-posten er ugyldig'}),
		password: z
			.string().min(6, { message: 'Passordet må være minst 6 tegn.'})
	})