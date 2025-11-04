import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const PEPPER = process.env.PASSWORD_PEPPER;
const SALT_ROUNDS = 12;

if (!PEPPER) {
	throw new Error('PASSWORD_PEPPER environment variable is not set');
}

function applyPepper(password: string): string {
    return crypto
        .createHmac('sha256', PEPPER!)
        .update(password)
        .digest('hex');
}

export async function hashPassword(password: string): Promise<string> {
    const pepperedPassword = applyPepper(password);
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hash = await bcryptjs.hash(pepperedPassword, salt);

    return hash;
}
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const pepperedPassword = applyPepper(password);
    return await bcryptjs.compare(pepperedPassword, hash);
}

export async function hashToken(token: string, SALT_ROUNDS = 4): Promise<string> {
	const salt = await bcryptjs.genSalt(SALT_ROUNDS);
	return await bcryptjs.hash(token, salt);
}