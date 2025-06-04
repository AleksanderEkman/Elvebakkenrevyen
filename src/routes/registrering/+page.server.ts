import { fail, error } from '@sveltejs/kit';
import { newUserSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { hashPassword } from '$lib/utils/password';
import { redirect } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import prisma from '$lib/utils/prismaUtils'
import crypto from 'crypto';

/* Definerer interface for oppretting av ny bruker */
interface CreateUserInput {
    username: string;
    email: string;
    password: string;
    first_name: string;
}

export const load = async (event) => {
    const form = await superValidate(event, zod(newUserSchema))
    return { form };
}

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(newUserSchema))
        console.log(form.data);
        if (!form.valid) {
			return fail(400, {
				form
			});
		}
        let hashed_password = await hashPassword(form.data.password);

        try {
            console.log(form.data);
            const user = await prisma.user.create({
                data: {
                    first_name: form.data.first_name,
                    email: form.data.email,
                    password: hashed_password,
                }
            })
        } catch (error) {
			console.error('Feil gjennom bruker-registrering:', error);
			return fail(500, { form, error: 'An feil oppstod ved registrering. Vennligst prøv igjen.' });
		}
        
    }
    
}