import { redisClient } from "../src/config/redis";

describe("Redis Service", () => {
    const token = "test123tokenxyx";
    const payload = {
        card_number: "1234567890123456",
        cvv: "123",
        expiration_month: "12",
        expiration_year: "2028",
        email: "test@gmail.com"
    };

    afterAll(async () => {
        await redisClient.quit();
    });

    it("should store and retrieve data with 15min expiration", async () => {
        const data = { ...payload, token };
        await redisClient.set(token, JSON.stringify(data), "EX", 900);
        const storedData = await redisClient.get(token);
        expect(storedData).toBeTruthy();
        const parsedData = JSON.parse(storedData!);
        expect(parsedData).toEqual(data);
        expect(parsedData.token).toBe(token);
    });
    it("should expire data after a short period (2 seconds)", async () => {
        const data = { ...payload, token };
        await redisClient.set(token, JSON.stringify(data), "EX", 2);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const expiredData = await redisClient.get(token);
        expect(expiredData).toBeNull();
    });
});
