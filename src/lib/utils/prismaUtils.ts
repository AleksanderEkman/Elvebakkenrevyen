import { PrismaClient } from '@prisma/client';
import type { Ticket } from '@prisma/client';

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}



export async function addTicket(input: {
    user_id: string,
    event_name: string,
    event_date: Date,
    type: string,
    seat_number?: string | null;
}): Promise<Ticket> {
    return prisma.ticket.create({
        data: {
            user_id: input.user_id,
            event_name: input.event_name,
            event_date: input.event_date,
            type: input.type,
            seat_number: input.seat_number || null,
        },
    })
}


export default prisma;