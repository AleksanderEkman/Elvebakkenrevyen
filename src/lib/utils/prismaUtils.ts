import { PrismaClient } from '@prisma/client';
import type { Ticket } from '@prisma/client';
import crypto from 'crypto';
import { hashToken } from './password';
import bcryptjs from 'bcryptjs';

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

export function generateValidationToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

export async function fetchUserByIdentifier(identifier: string) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: identifier },
                { first_name: identifier }
            ]
        },
        select: {
            id: true,
            first_name: true,
            email: true,
            password: true
        }
    });

    if (!user) return null;

    return {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        hashed_password: user.password
    };
}

export async function insertRefreshToken(userId: string, refreshToken: string, deviceId: string) {
    const hashedToken = await hashToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

    await prisma.refresh_token.upsert({
        where: { device_id: deviceId },
        update: {
            token_hash: hashedToken,
            expires_at: expiresAt
        },
        create: {
            user_id: userId,
            token_hash: hashedToken,
            device_id: deviceId,
            expires_at: expiresAt
        }
    });
}

export async function fetchUserByPrimary(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            first_name: true,
            email: true
        }
    });

    return user;
}

export async function verifyRefreshToken(refreshToken: string, deviceId: string) {
    const tokenRecord = await prisma.refresh_token.findUnique({
        where: { device_id: deviceId }
    });

    if (!tokenRecord) return null;

    // Check if token is expired
    if (tokenRecord.expires_at < new Date()) {
        await prisma.refresh_token.delete({
            where: { device_id: deviceId }
        });
        return null;
    }

    // Compare the token
    const isValid = await bcryptjs.compare(refreshToken, tokenRecord.token_hash);

    if (!isValid) return null;

    return tokenRecord.user_id;
}

export async function deleteRefreshToken(deviceId: string) {
    await prisma.refresh_token.delete({
        where: { device_id: deviceId }
    }).catch(() => {
        // Ignore if token doesn't exist
    });
}

export async function deleteAllRefreshTokens(userId: string) {
    await prisma.refresh_token.deleteMany({
        where: { user_id: userId }
    });
}

export async function addTicket(input: {
    user_id: string,
    event_name: string,
    event_date: Date | string,
    type: string,
    seat_number?: string | null;
}): Promise<{ ticket: Ticket; rawToken: string }> {
    // Generate validation token
    const validationToken = generateValidationToken();

    // Hash the token with 4 salt rounds and no pepper
    const hashedToken = await hashToken(validationToken, 4);

    const ticket = await prisma.ticket.create({
        data: {
            user_id: input.user_id,
            event_name: input.event_name,
            event_date: input.event_date,
            type: input.type,
            seat_number: input.seat_number || null,
            token: hashedToken,
        },
    });

    // Return both the ticket and the raw token for QR code generation
    return {
        ticket,
        rawToken: validationToken
    };
}


export default prisma;