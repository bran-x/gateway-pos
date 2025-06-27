/**
 * Validates whether an email address is valid based on specific domains.
 * @param email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid and belongs to the specified
 */
function isValidEmail(email: string): boolean {
    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
}

/**
 * Validates the CVV (Card Verification Value) of a credit card.
 * @param cvv - The CVV to validate.
 * @returns {boolean} - Returns true if the CVV is valid (3 or 4 digits).
 */
function isValidCVV(cvv: string): boolean {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
}

/**
 * Validates the expiration month of a credit card.
 * @param month - The expiration month to validate.
 * @returns {boolean} - Returns true if the month is valid (1-12).
 */
function isValidMonth(month: string): boolean {
    const monthRegex = /^(0?[1-9]|1[0-2])$/;
    return monthRegex.test(month);
}

/**
 * Validates the expiration year of a credit card.
 * @param year - The expiration year to validate.
 * @returns {boolean} - Returns true if the year is valid (current year to 5 years in the future).
 */
function isValidYear(year: string): boolean {
    const currentYear = new Date().getFullYear();
    const yearRegex = /^\d{4}$/;
    if (!yearRegex.test(year)) {
        return false;
    }
    const yearNumber = parseInt(year, 10);
    return yearNumber >= currentYear && yearNumber <= currentYear + 5;
}

export {
    isValidEmail,
    isValidCVV,
    isValidMonth,
    isValidYear
};