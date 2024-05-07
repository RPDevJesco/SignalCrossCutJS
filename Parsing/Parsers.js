/**
 * Parses a string input into an integer.
 * @param {string} input - The string to be parsed into an integer.
 * @returns {number} - The parsed integer.
 * @throws {Error} - Throws an error if the input is not a valid integer.
 */
export const integerParser = (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) throw new Error("Invalid integer");
    return parsed;
};

/**
 * Parses a string input into a positive integer.
 * @param {string} input - The string to be parsed into a positive integer.
 * @returns {number} - The parsed positive integer.
 * @throws {Error} - Throws an error if the input is not a valid positive integer.
 */
export const positiveIntegerParser = (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) throw new Error("Invalid integer");
    if (parsed <= 0) throw new Error("Number must be positive");
    return parsed;
};

/**
 * Parses a string input into a date object and returns it in YYYY-MM-DD format.
 * @param {string} input - The string to be parsed into a date.
 * @returns {string} - The date in YYYY-MM-DD format.
 * @throws {Error} - Throws an error if the input is not a valid date.
 */
export const dateParser = (input) => {
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) throw new Error("Invalid date");
    return parsed.toISOString().slice(0, 10); // Returns date in YYYY-MM-DD format
};

/**
 * Parses a string input into a floating-point number.
 * @param {string} input - The string to be parsed into a float.
 * @returns {number} - The parsed floating-point number.
 * @throws {Error} - Throws an error if the input is not a valid float.
 */
export const floatParser = (input) => {
    const parsed = parseFloat(input);
    if (isNaN(parsed)) throw new Error("Invalid float");
    return parsed;
};

/**
 * Parses a string input into a boolean value.
 * @param {string} input - The string to be parsed into a boolean.
 * @returns {boolean} - The parsed boolean value.
 * @throws {Error} - Throws an error if the input is not a valid boolean string.
 */
export const booleanParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Invalid input type for boolean parsing");
    }
    const normalized = input.toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
    throw new Error("Invalid boolean");
};

/**
 * Parses a string input into a JSON object.
 * @param {string} input - The string to be parsed into JSON.
 * @returns {Object} - The parsed JSON object.
 * @throws {Error} - Throws an error if the input is not valid JSON.
 */
export const jsonParser = (input) => {
    try {
        return JSON.parse(input);
    } catch (error) {
        throw new Error("Invalid JSON");
    }
};

/**
 * Validates that the input is an array.
 * @param {Array} input - The input to be validated as an array.
 * @returns {Array} - The validated array.
 * @throws {Error} - Throws an error if the input is not an array.
 */
export const arrayParser = (input) => {
    if (!Array.isArray(input)) {
        throw new Error("Input must be an array");
    }
    return input;
};

/**
 * Trims whitespace from the beginning and end of a string input.
 * @param {string} input - The string to be trimmed.
 * @returns {string} - The trimmed string.
 * @throws {Error} - Throws an error if the input is not a string.
 */
export const trimParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Input must be a string");
    }
    return input.trim();
};

/**
 * Parses a string input into a date-time object and returns it in ISO 8601 format.
 * @param {string} input - The string to be parsed into a date-time.
 * @returns {string} - The date-time in ISO 8601 format.
 * @throws {Error} - Throws an error if the input is not a valid date-time format.
 */
export const dateTimeParser = (input) => {
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) throw new Error("Invalid date-time format");
    return parsed.toISOString();  // Returns complete date-time in ISO format
};

/**
 * Parses a string input representing currency into a floating-point number.
 * @param {string} input - The currency string to be parsed.
 * @returns {number} - The parsed currency as a float.
 * @throws {Error} - Throws an error if the input is not a valid currency format.
 */
export const currencyParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Input must be a string");
    }
    const normalized = input.replace(/[^0-9.-]+/g, '');
    const parsed = parseFloat(normalized);
    if (isNaN(parsed)) throw new Error("Invalid currency");
    return parsed;
};

/**
 * Parses a string input and sanitizes it to prevent XSS attacks, normalizes case to lower,
 * and enforces a maximum length.
 * @param {string} input - The string to be parsed and sanitized.
 * @returns {string} - The sanitized, normalized, and length-checked string.
 * @throws {Error} - Throws an error if the input exceeds the maximum length or is not a string.
 */
export const stringParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Input must be a string");
    }
    // Basic sanitization to prevent XSS attacks
    input = input.replace(/<script.*?>.*?<\/script>/gi, '');
    // Normalize the case
    input = input.toLowerCase();
    // Enforce a maximum length
    const maxLength = 255;
    if (input.length > maxLength) {
        throw new Error(`Input must not exceed ${maxLength} characters`);
    }
    return input;
};