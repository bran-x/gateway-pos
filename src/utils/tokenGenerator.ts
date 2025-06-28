import { randomBytes } from 'crypto';

export function generateToken(): string {
    const buffer = randomBytes(16);
    return buffer.toString('base64')
        .replace(/\+/g, 'A')
        .replace(/\//g, 'B')
        .replace(/=/g, '')
        .substring(0, 16);
}