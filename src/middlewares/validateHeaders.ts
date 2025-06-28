import { Request, Response, NextFunction } from 'express';
import { db } from '../config/postgres';

export async function validateHeaders(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        res.status(400).json({ error: 'Authorization header is required' });
        return;
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(400).json({ error: 'Invalid Authorization header format' });
        return;
    }
    const publicKey = parts[1];
    const isValidFormat = /^pk_test_[A-Za-z0-9]+$/.test(publicKey);
    if (!isValidFormat) {
        res.status(403).json({ error: 'Invalid public key format' });
        return;
    }
    try {
        const exists = await db('public_keys')
            .where({ pk: publicKey }).first();
        if (!exists) {
            res.status(403).json({ error: 'Public key does not exist' });
            return;
        }
        (req as any).publicKey = publicKey;
        return next();
    }
    catch (error) {
        console.error('[validateHeaders] Error checking public key:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}