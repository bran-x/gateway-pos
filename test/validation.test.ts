import {
    isValidEmail,
    isValidCVV,
    isValidMonth,
    isValidYear
} from "../src/utils/validation";

describe("Validation Utilities", () => {
    describe("Email Validation", () => {
        it("should accept valid domains", () => {
            expect(isValidEmail("test@gmail.com")).toBe(true);
            expect(isValidEmail("test2@hotmail.com")).toBe(true);
            expect(isValidEmail("test3@yahoo.es")).toBe(true);
        });
        it("should reject invalid domains", () => {
            expect(isValidEmail("test@random.xyz")).toBe(false);
            expect(isValidEmail("test2@email.com")).toBe(false);
        });
        it("should reject invalid formats", () => {
            expect(isValidEmail("test@.com")).toBe(false);
            expect(isValidEmail("test@com")).toBe(false);
            expect(isValidEmail("test.com")).toBe(false);
            expect(isValidEmail("test@com.")).toBe(false);
        });
    });
    describe("CVV Validation", () => {
        it("should accept CVV with 3 or 4 digits", () => {
            expect(isValidCVV("123")).toBe(true);
            expect(isValidCVV("1234")).toBe(true);
        });
        it("should reject invalid CVV formats", () => {
            expect(isValidCVV("12")).toBe(false);
            expect(isValidCVV("12345")).toBe(false);
            expect(isValidCVV("abc")).toBe(false);
        });
    });
    describe("Month Validation", () => {
        it("should accept valid months (1-12)", () => {
            expect(isValidMonth("1")).toBe(true);
            expect(isValidMonth("12")).toBe(true);
        });
        it("should reject invalid months", () => {
            expect(isValidMonth("0")).toBe(false);
            expect(isValidMonth("13")).toBe(false);
        });
    });
    describe("Year Validation", () => {
        it("should accept current year up to 5 years in the future", () => {
            const currentYear = new Date().getFullYear();
            expect(isValidYear(currentYear.toString())).toBe(true);
            expect(isValidYear((currentYear + 5).toString())).toBe(true);
        }
        );
        it("should reject past years and future years beyond 5 years", () => {
            const currentYear = new Date().getFullYear();
            expect(isValidYear((currentYear - 1).toString())).toBe(false);
            expect(isValidYear((currentYear + 6).toString())).toBe(false);
        }
        );
        it("should reject invalid formats", () => {
            expect(isValidYear("abc")).toBe(false);
            expect(isValidYear("202a")).toBe(false);
            expect(isValidYear("20.23")).toBe(false);
        }
        );
    });
});
