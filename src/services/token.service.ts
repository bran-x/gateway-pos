import { redisClient } from '../config/redis';
import { TokenRepository } from '../repositories/token.repository';
import { generateToken } from '../utils/tokenGenerator';
import { CardData } from '../types/card';

/**
 * Creates a token for the given card data and stores it in Redis.
 * @param cardData - The card data to be stored in the token.
 * @returns {Promise<string>} - A promise that resolves to the generated token.
 */
export async function createToken(cardData: CardData): Promise<string> {
    const token = generateToken();
    await TokenRepository.saveToken(token, cardData);
    return token;
}

/**
 * Retrieves card data associated with a given token from Redis.
 * @param token - The token to retrieve card data for.
 * @returns {Promise<Partial<CardData> | null>} - A promise that resolves to the card data if found, or null if not found.
 */
export async function getCardDataFromToken(token: string): Promise<Partial<CardData> | null> {
    const data = await TokenRepository.getTokenData(token);
    if (!data) return null;
    const { cvv, ...cardData } = data;
    return cardData;
}