import { redisClient } from '../config/redis';
import { generateToken } from '../utils/tokenGenerator';
import { CardData } from '../utils/types';

export async function createToken(cardData: CardData): Promise<string> {
    let token: string;
    let exists: string | null;
    do {
        token = generateToken();
        exists = await redisClient.get(`token:${token}`);
    } while (exists);

    const payload = JSON.stringify({
        ...cardData,
        created_at: new Date().toISOString(),
        token,
    });
    await redisClient.set(`token:${token}`, payload, 'EX', 900);
    return token;
}

export async function getCardDataFromToken(token: string): Promise<Partial<CardData> | null> {
    const data = await redisClient.get(`token:${token}`);
    if (!data) {
        return null;
    }
    const parsedData = JSON.parse(data);
    delete parsedData.cvv;
    return parsedData;
}