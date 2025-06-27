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

    beforeAll(async () => {
        await redisClient.connect();
    });

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
    it("should expire data after 15 minutes", async () => {
        jest.useFakeTimers();
        jest.advanceTimersByTime(900000); // Fast-forward 15 minutes
        const storedData = await redisClient.get(token);
        expect(storedData).toBeNull();
        jest.useRealTimers();
    });
});
