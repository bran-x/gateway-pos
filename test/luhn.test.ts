import { luhnCheck } from "../src/utils/luhn";

describe("Luhn Algorithm Validation", () => {
    it("should return true for valid card number", () => {
        const validCardNumber = "4532015112830366"; // Example valid card number
        expect(luhnCheck(validCardNumber)).toBe(true);
    });

    it("should return false for invalid card number", () => {
        const invalidCardNumber = "1234567890123456"; // Example invalid card number
        expect(luhnCheck(invalidCardNumber)).toBe(false);
    });
    it("should return false for empty card number", () => {
        const emptyCardNumber = "";
        expect(luhnCheck(emptyCardNumber)).toBe(false);
    });
    it("should return false for non-numeric card number", () => {
        const nonNumericCardNumber = "abcd1234";
        expect(luhnCheck(nonNumericCardNumber)).toBe(false);
    });
    it("should return false for card number with special characters", () => {
        const specialCharCardNumber = "4532-0151-1283-0366"; // Example with dashes
        expect(luhnCheck(specialCharCardNumber)).toBe(false);
    });
    it("should return true for 13-16 digit card numbers", () => {
        const cards = [
            "4532015112830366", // 16 digits
            "4532015112830",    // 13 digits
        ];
        cards.forEach(card => {
            expect(luhnCheck(card)).toBe(true);
        });
    });

});