import jwt from 'jsonwebtoken';
import { generateRefreshToken } from '$lib/utils/prismaUtils';
import {createHash, randomUUID as uuid } from 'crypto';
import type { RequestEvent } from '@sveltejs/kit';
import prisma from '$lib/utils/prismaUtils';
import { hashToken } from '$lib/utils/password';
import type { User } from '@prisma/client';

export async function authenticate(event: RequestEvent, userWithoutPassword: User) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        throw new Error('Mangler JWT_SECRET_KEY env variabel');
    }

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
                userId: userWithoutPassword.id,
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
     

}