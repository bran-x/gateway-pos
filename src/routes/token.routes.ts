import { Router, Request, Response } from 'express';
import { validateCardData } from '../utils/validation';
import { createToken, getCardDataFromToken } from '../services/token.service';

const router = Router();

/**
 * Token generation endpoint.
 * 
 * @route POST /token
 * @param {Request} req - The request object containing card data.
 * @param {Response} res 
 * @returns {201} - Returns the generated token on success.
 * @returns {400} - Returns an error if the card data is invalid.
 * @returns {500} - Returns an internal server error if something goes wrong.
 */
router.post('/token', async (req, res): Promise<any> => {
    const cardData = req.body;
    const { valid, error } = validateCardData(cardData);
    if (!valid) {
        return res.status(400).json({ error });
    }

    try {
        const token = await createToken(cardData);
        return res.status(201).json({ token });
    } catch (error) {
        console.error('[POST /token] Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }

});

/**
 * Token retrieval endpoint.
 * 
 * @route GET /token/:token
 * @param {Request} req - The request object containing the token as a URL parameter.
 * @param {Response} res
 * @returns {200} - Returns the card data associated with the token, excluding CVV.
 * @returns {404} - Returns an error if the token is not found or expired.
 * @returns {500} - Returns an internal server error if something goes wrong.
 */
router.get('/token/:token', async (req: Request, res: Response): Promise<any> => {
    const token = req.params.token;
    if (!token) {
        return res.status(400).json({ error: 'Token is required.' });
    }

    try {
        const cardData = await getCardDataFromToken(token);
        if (!cardData) {
            return res.status(404).json({ error: 'Token not found or expired.' });
        }
        // Remove CVV from the response
        return res.status(200).json(cardData);
    } catch (error) {
        console.error('[GET /token/:token] Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;