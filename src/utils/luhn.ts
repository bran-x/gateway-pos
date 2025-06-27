/**
 * Luhn algorithm check for validating credit card numbers.
 * @param cardNumber - The credit card number as a string.
 * @returns {boolean} - Returns true if the card number is valid according to the Luhn algorithm, false otherwise.
 */
export function luhnCheck(cardNumber: string): boolean {
    if (!/^\d{13,19}$/.test(cardNumber)) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}