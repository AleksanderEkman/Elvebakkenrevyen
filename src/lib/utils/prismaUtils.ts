import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

export default prisma;
