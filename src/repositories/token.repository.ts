import { redisClient } from '../config/redis';
import { CardData } from '../utils/types';

const EXPIRATION_TIME = 60 * 15;

/**
 * Repository for managing tokens in Redis.
 * Provides methods to save and retrieve tokens with associated card data.
 * @module TokenRepository
 */
export const TokenRepository = {
    /**
     * Saves a token with associated card data in Redis.
     * @param token - The token to be saved.
     * @param cardData - The card data associated with the token.
     * @return {Promise<void>} - A promise that resolves when the token is saved.
     */
    async saveToken(token: string, cardData: CardData): Promise<void> {
        const payload = {
            ...cardData,
            created_at: new Date().toISOString(),
            token,
        };
        await redisClient.set(`token:${token}`, JSON.stringify(payload), 'EX', EXPIRATION_TIME);
    },

    /**
     * Retrieves card data associated with a given token from Redis.
     * @param token - The token to retrieve card data for.
     * @returns {Promise<CardData | null>} - A promise that resolves to the card data if found, or null if not found.
     */
    async getTokenData(token: string): Promise<CardData | null> {
        const data = await redisClient.get(`token:${token}`);
        return data ? JSON.parse(data) : null;
    },
};