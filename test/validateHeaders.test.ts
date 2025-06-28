import request from 'supertest';
import express from 'express';
import { Request, Response } from 'express';
import { validateHeaders } from '../src/middlewares/validateHeaders';
import { db } from '../src/config/postgres';

const app = express();
app.use(validateHeaders);

app.get('/test', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Headers are valid' });
});

describe('Header Validation Middleware', () => {
    afterAll(() => {
        db.destroy();
    });

    it('should return 400 if pk header is missing', async () => {
        const response = await request(app)
            .get('/test');
        expect(response.status).toBe(400);
    });
    it('should return 403 if pk header is invalid', async () => {
        const response = await request(app)
            .get('/test')
            .set('Authorization', 'Bearer invalid_token');
        expect(response.status).toBe(403);
    });
    it('should pass if pk header is valid', async () => {
        const response = await request(app)
            .get('/test')
            .set('Authorization', 'Bearer pk_test_LsRBKejzCOEEWOsw');
        expect(response.status).toBe(200);
    });
});