import { PrismaClient } from '@prisma/client';
import type { Ticket } from '@prisma/client';

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

export default prisma;

export async function createTicket(input: {
    userId: string,
    eventName: string,
    eventDate: Date,
    seatNumber?: string | null;
}): Promise<Ticket> {
    return prisma.ticket.create({
        data: {
            userId: input.userId,
            eventName: input.eventName,
            eventDate: input.eventDate,
            seatNumber: input.seatNumber || null,
        },
    })
}