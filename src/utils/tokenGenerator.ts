import { randomBytes } from 'crypto';

/**
 * Generates a secure random token.
 * @returns A 16-character token string.
 */
export function generateToken(): string {
    const buffer = randomBytes(16);
    return buffer.toString('base64')
        .replace(/\+/g, 'A')
        .replace(/\//g, 'B')
        .replace(/=/g, '')
        .substring(0, 16);
}