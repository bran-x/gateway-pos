import request from 'supertest';
import app from '../src/app';

describe('Token API Endpoints', () => {
    const headers = {
        'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw',
    };
    const payload = {
        card_number: '4532015112830366',
        cvv: '123',
        expiration_month: '12',
        expiration_year: String(new Date().getFullYear() + 1),
        email: 'test@gmail.com',
    };

    it('should return 400 for missing Authorization header', async () => {
        const response = await request(app)
            .post('/tokens')
            .send(payload);
        expect(response.status).toBe(400);
    });

    it('should return 400 for invalid Authorization header', async () => {
        const response = await request(app)
            .post('/tokens')
            .set('Authorization', 'InvalidToken')
            .send(payload);
        expect(response.status).toBe(400);
    });
    it('should return 400 for invalid card number', async () => {
        const invalidPayload = { ...payload, card_number: '1234567890123456' };
        const response = await request(app)
            .post('/tokens')
            .set(headers)
            .send(invalidPayload);
        expect(response.status).toBe(400);
    });

    it('should create a token successfully', async () => {
        const response = await request(app)
            .post('/tokens')
            .set(headers)
            .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toHaveLength(16);
    });

    it('should retrieve card data with a valid token', async () => {
        const response = await request(app)
            .post('/tokens')
            .set(headers)
            .send(payload);
        const token = response.body.token;

        const res = await request(app)
            .get(`/tokens/${token}`)
            .set(headers);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            card_number: payload.card_number,
            expiration_month: payload.expiration_month,
            expiration_year: payload.expiration_year,
            email: payload.email,
        });
        expect(res.body).not.toHaveProperty('cvv');
    });

    it('should return 404 for expired or invalid token', async () => {
        const invalidToken = 'invalidtoken1234';
        const response = await request(app)
            .get(`/tokens/${invalidToken}`)
            .set(headers);
        expect(response.status).toBe(404);
    });
});
