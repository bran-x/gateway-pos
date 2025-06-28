/**
 * @typedef {Object} CardData
 * @property {string} card_number - The credit card number.
 * @property {string} cvv - The card verification value (CVV).
 * @property {string} expiration_month - The expiration month of the card (1-12).
 * @property {string} expiration_year - The expiration year of the card (4 digits).
 * @property {string} email - The email associated with the card.
 */
export interface CardData {
    card_number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    email: string;
}