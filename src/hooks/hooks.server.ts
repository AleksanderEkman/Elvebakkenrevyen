import { error, type Handle, type RequestEvent } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client';
import prisma from '$lib/utils/prismaUtils'
import { generateRefreshToken } from '$lib/utils/prismaUtils';
import { hashToken } from '$lib/utils/password';

const limiter = new RateLimiter({
    IP: [100, 'd'],
    IPUA: [1000, 'h']
});

const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(self), microphone=()',
    'Access-Control-Allow-Origin': 'https://bakkadiffusion.no',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Expires: '0',
    Pragma: 'no-cache', 
};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
    throw new Error('Missing JWT_SECRET_KEY environment variable');
}

function redirectIfLoggedIn(event: RequestEvent) {
    if ((event.url.pathname === '/logginn' || event.url.pathname === '/registrering') && event.locals.user) {
        console.log('redirecting');
        throw redirect(302, '/');
    }
}

const verifyRefreshToken = (refreshToken: string, deviceId: string) => {
    return prisma.refresh_token.findFirst({
        where: {
            token_hash: refreshToken,
            device_id: deviceId
        }
    })
};

const deleteRefreshToken = (deviceId: string) => {
    return prisma.refresh_token.delete({
        where: {
            device_id: deviceId
        }
    })
}

const fetchUserByPrimary = (id: string) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

const insertRefreshToken = async (userId: string, refreshToken: string, deviceId: string) => {
    return prisma.refresh_token.create({
        data: {
            userId: userId,
            token_hash: await hashToken(refreshToken),
            device_id: deviceId,
            expires_at: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000)
        }
    })
}

const handleAuth: Handle = async ({ event, resolve }) => {
    if (await limiter.isLimited(event)) {
        throw error(429, 'Too Many Requests');
    }
    redirectIfLoggedIn(event);
    const authToken = event.cookies.get('authToken');
    let refreshToken = event.cookies.get('refreshToken');
    if (!refreshToken) {
        console.log('No refresh token, clearing auth');
        event.locals.user = undefined;
        event.cookies.delete('authToken', { path: '/' });
    }

    try {
        if (authToken) {
			const claims = jwt.verify(authToken, JWT_SECRET_KEY) as { userData: User; exp: number };
            event.locals.user = claims.userData;
            console.log('Auth token verified for user:', claims.userData.id);
			const now = Math.floor(Date.now() / 1000);
			if (claims.exp - now < 300) {
			  const newAuthToken = jwt.sign({ userData: claims.userData }, JWT_SECRET_KEY, {
				expiresIn: '20m'
			  });
		
			  event.cookies.set('authToken', newAuthToken, {
				httpOnly: true,
				secure: true,
				maxAge: 60 * 20,
				sameSite: 'strict',
				path: '/',
				priority: 'high'
			  });
			  console.log('Refreshed authToken pre-expiration');
			}

        } else {
            event.locals.user = undefined;
            event.cookies.delete('authToken', { path: '/' });
        }
    } catch (err) {
		event.cookies.delete('authToken', { path: '/' });
    }
    redirectIfLoggedIn(event);
    return resolve(event);
};


const handleRefreshToken: Handle = async ({ event, resolve }) => {
    redirectIfLoggedIn(event);
    if (event.locals.user) {
        return resolve(event);
    }

    let refreshToken = event.cookies.get('refreshToken');

    if (!refreshToken) {
        return resolve(event);
    }

    try {
		let deviceId = event.cookies.get('deviceId');
        let refreshToken = event.cookies.get('refreshToken');

        if (!refreshToken || !deviceId) {
            return resolve(event);
        }

        const tokenData = await verifyRefreshToken(refreshToken, deviceId);

        if (!tokenData) {
			await deleteRefreshToken(deviceId);
            event.cookies.delete('refreshToken', { path: '/' });
            return resolve(event);
        }

        const userData = await fetchUserByPrimary(tokenData.userId);
        if (!userData) {
			await deleteRefreshToken(deviceId);
            event.cookies.delete('refreshToken', { path: '/' });
            return resolve(event);
        }

		const newRefreshToken = generateRefreshToken();

        try {
            await deleteRefreshToken(deviceId);
            await insertRefreshToken(userData.id, newRefreshToken, deviceId);
        } catch (error) {
            await deleteRefreshToken(deviceId);
            throw error; 
        }


		const { password, ...userWithoutPassword } = userData;
		const newAuthToken = jwt.sign({ userData: userWithoutPassword }, JWT_SECRET_KEY, {
			expiresIn: '20m'
		});

		event.cookies.set('authToken', newAuthToken, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 20,
			sameSite: 'strict',
			path: '/',
            priority: 'high'
		});

		event.cookies.set('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 30,
			sameSite: 'strict',
			path: '/',
            priority: 'high'
		});

		event.locals.user = userWithoutPassword;

    }  catch (error) {
        console.error('Error during token refresh:', error);

        if (error instanceof Error) {
            console.error('Refresh token error:', error.message);
        }

        if (refreshToken) {
            event.cookies.set('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict',
                path: '/',
                priority: 'high'
            });
        }
    }

    redirectIfLoggedIn(event);
    return resolve(event);
};


const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                ...securityHeaders,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }

    const response = await resolve(event, {});

    response.headers.set('Strict-Transport-Security', securityHeaders['Strict-Transport-Security']);
    response.headers.set('X-Frame-Options', securityHeaders['X-Frame-Options']);
    response.headers.set('X-Content-Type-Options', securityHeaders['X-Content-Type-Options']);
    response.headers.set('Referrer-Policy', securityHeaders['Referrer-Policy']);
    response.headers.set('Permissions-Policy', securityHeaders['Permissions-Policy']);
    response.headers.set(
        'Access-Control-Allow-Origin',
        securityHeaders['Access-Control-Allow-Origin']
    );
    response.headers.set(
        'Access-Control-Allow-Methods',
        securityHeaders['Access-Control-Allow-Methods']
    );
    response.headers.set(
        'Access-Control-Allow-Headers',
        securityHeaders['Access-Control-Allow-Headers']
	);
    response.headers.set('Vary', securityHeaders['Vary']);
    response.headers.set('Cache-Control', securityHeaders['Cache-Control']);

    return response;
};


export const handle: Handle = sequence(handleAuth, handleRefreshToken, handleSecurityHeaders);