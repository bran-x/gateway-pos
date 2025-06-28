import { redisClient } from '../config/redis';
import { generateToken } from '../utils/tokenGenerator';
import { CardData } from '../utils/types';

/**
 * Creates a token for the given card data and stores it in Redis.
 * @param cardData - The card data to be stored in the token.
 * @returns {Promise<string>} - A promise that resolves to the generated token.
 */
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

/**
 * Retrieves card data associated with a given token from Redis.
 * @param token - The token to retrieve card data for.
 * @returns {Promise<Partial<CardData> | null>} - A promise that resolves to the card data if found, or null if not found.
 */
export async function getCardDataFromToken(token: string): Promise<Partial<CardData> | null> {
    const data = await redisClient.get(`token:${token}`);
    if (!data) {
        return null;
    }
    const parsedData = JSON.parse(data);
    delete parsedData.cvv;
    return parsedData;
}