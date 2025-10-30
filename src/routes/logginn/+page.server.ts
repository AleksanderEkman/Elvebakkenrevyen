import { fail, redirect, error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { loginSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fetchUserByIdentifier, generateRefreshToken, insertRefreshToken, emailVerified } from '$lib/prismaUtils.ts';
import { comparePassword } from '$lib/utils/password';
import jwt from 'jsonwebtoken';
import { sleep } from '$lib/utils/helpers';
import { generateDeviceFingerprint } from '$lib/utils/fingerprint';

const limiter = new RateLimiter({
	IP: [5, '10m'], // 5 forsøk hvert tiende minutt per IP
	IPUA: [15, 'h'] // 15 forsøk hver time per IP & User-Agent
});

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
	throw new Error('Missing JWT_SECRET_KEY environment variable');
}

const INVALID_HASH =
	'$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid';

	
export const load = async (event) => {
	console.log(event.locals.user);
	if (event.locals.user || event.cookies.get('authToken')) {
		console.log('redirecting');
		throw redirect(302, '/');
	}
	const pendingVerification = event.cookies.get('pendingVerification');
	if (pendingVerification) {
		throw redirect(302, '/verifyemail');
	}
	const form = await superValidate(event, zod(loginSchema));
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (await limiter.isLimited(event)) {
			form.errors.password = ['For mange forsøk. Vennligst prøv igjen senere.'];
			return fail(429, { form})
		};

		if (!form.valid) {
			return fail(400, { form });
		}

		const userData = await fetchUserByIdentifier(form.data.identifier);

		const errorMessage = 'Ugyldig brukernavn, e-postadresse eller passord';

		const isMatch = await comparePassword(
			form.data.password,
			userData?.hashed_password || INVALID_HASH
		);
		if (!userData || !isMatch) {
			await sleep(500);
			form.errors.password = [errorMessage];
			return fail(400, { form });
		}

		const { hashed_password, ...userWithoutPassword } = userData;

		if (userData.verified_email === false) {
			throw redirect(302, '/verifyemail');
		}

		const authToken = jwt.sign({ userData: userWithoutPassword }, JWT_SECRET_KEY, {
			expiresIn: '20m'
		});

		event.cookies.set('authToken', authToken, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 20,
			sameSite: 'strict',
			path: '/',
			priority: 'high'
		});

		const refreshToken = generateRefreshToken();
		const deviceId = generateDeviceFingerprint(event);

		event.cookies.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 30, 
			sameSite: 'strict',
			path: '/',
			priority: 'high'
		});

		await insertRefreshToken(userWithoutPassword.id, refreshToken, deviceId);
		await limiter.clear();
		throw redirect(302, '/');
	}
};
