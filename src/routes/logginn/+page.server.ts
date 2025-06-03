import { fail, redirect, error } from '@sveltejs/kit'
import { loginSchema } from '$lib/schemas'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import prisma from '$lib/utils/prismaUtils'
import { sleep } from '$lib/utils/helpers';
import { comparePassword, hashToken } from '$lib/utils/password'
import jwt from 'jsonwebtoken';
import { generateRefreshToken } from '$lib/utils/prismaUtils';
import {createHash, randomUUID as uuid } from 'crypto';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

if (!JWT_SECRET_KEY) {
    throw new Error('Mangler JWT_SECRET_KEY env variabel')
}

const INVALID_HASH =
	'$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid';

export const load = async (event) => {
    if (event.locals.user || event.cookies.get('authToken')) {
        throw redirect(302, '/');
    }
    const form = await superValidate(event, zod(loginSchema))
    return { form };
}

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: form.data.email
            }
        })

        const errorMessage = 'Ugyldig brukernavn, e-postadresse eller passord';

        const isMatch = comparePassword(form.data.password, user?.password || INVALID_HASH);
        if (!user || !isMatch) {
            await sleep(300);
            form.errors.password = [errorMessage];
            return fail(400, form);
        }

        const { password, ...userWithoutPassword} = user;

        const authToken = jwt.sign({ userData: userWithoutPassword }, JWT_SECRET_KEY, {
            expiresIn: '20m'
        })
        
        event.cookies.set('authToken', authToken, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 20,
			sameSite: 'strict',
			path: '/',
			priority: 'high'
		});

        const refreshToken = generateRefreshToken();
        const deviceId = uuid();

        event.cookies.set('deviceId', deviceId, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 7 * 30,
			sameSite: 'strict',
			path: '/',
			priority: 'high'
		});

        await prisma.refresh_token.create({
            data: {
                user_id: user.id,
                token_hash: await hashToken(refreshToken),
                device_id: createHash('sha256').update(deviceId).digest('hex'),
                expires_at: new Date(Date.now() + 60 * 60 * 24 * 7 * 30 * 1000)
            }
        })

        event.cookies.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 7 * 30,
			sameSite: 'strict',
			path: '/',
			priority: 'high'
		});
        throw redirect(302, '/');
    }
}