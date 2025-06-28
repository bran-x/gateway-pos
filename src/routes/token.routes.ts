import { Router, Request, Response } from 'express';
import { isValidEmail, isValidCVV, isValidMonth, isValidYear, validateCardData } from '../utils/validation';
import { CardData } from '../utils/types';
import { createToken, getCardDataFromToken } from '../services/token.service';

const router = Router();

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