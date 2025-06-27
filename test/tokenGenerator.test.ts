import { generateToken } from "../src/utils/tokenGenerator";

describe("Token Generation", () => {
    it("should generate a token of length 16", () => {
        const token = generateToken();
        expect(token).toHaveLength(16);
    });
    it("should only contain alphanumeric characters", () => {
        const token = generateToken();
        expect(/^[a-zA-Z0-9]+$/.test(token)).toBe(true);
    });
    it("should generate different tokens on each call", () => {
        const token1 = generateToken();
        const token2 = generateToken();
        expect(token1).not.toBe(token2);
    });
});