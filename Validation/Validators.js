/**
 * Validates that the 'name' field in the newState object is not empty after trimming whitespace.
 * @param {Object} oldState - The previous state of the object.
 * @param {Object} newState - The new state of the object to validate.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if validation passes.
 */
export const nonEmptyNameValidator = (oldState, newState) => {
    if ("name" in newState && newState.name.trim() === "") {
        return "Name cannot be empty.";
    }
    return true;
};

/**
 * Validates that the 'age' field in the newState object is within the range 0 to 150.
 * @param {Object} oldState - The previous state of the object.
 * @param {Object} newState - The new state of the object to validate.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if validation passes.
 */
export const ageRangeValidator = (oldState, newState) => {
    if ("age" in newState && (newState.age < 0 || newState.age > 150)) {
        return "Age must be between 0 and 150.";
    }
    return true;
};

/**
 * Validates that the 'email' field in the newState object matches a simple email format.
 * @param {Object} oldState - The previous state of the object.
 * @param {Object} newState - The new state of the object to validate.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if validation passes.
 */
export const emailValidator = (oldState, newState) => {
    if ("email" in newState) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        if (!emailRegex.test(newState.email)) {
            return "Invalid email format.";
        }
    }
    return true;
};

/**
 * Validates that a specified field in the newState object is a positive number.
 * @param {string} field - The name of the field to validate.
 * @returns {Function} - Returns a validator function configured for the specified field.
 */
export const positiveNumberValidator = (field) => (oldState, newState) => {
    if (field in newState && newState[field] <= 0) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number.`;
    }
    return true;
};

/**
 * Validates that all specified fields are present in either the oldState or newState object.
 * @param {string[]} fields - An array of field names that are required.
 * @returns {Function} - Returns a validator function configured for the specified fields.
 */
export const requiredFieldsValidator = (fields) => (oldState, newState) => {
    for (const field of fields) {
        if (!(field in newState) && !(field in oldState)) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }
    }
    return true;
};

/**
 * Validates that the 'password' field in the newState object meets certain strength criteria.
 * @param {Object} oldState - The previous state of the object.
 * @param {Object} newState - The new state of the object to validate.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if validation passes.
 */
export const passwordStrengthValidator = (oldState, newState) => {
    if ("password" in newState) {
        const password = newState.password;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const minLength = password.length >= 8;

        if (!hasUppercase || !hasLowercase || !hasNumber || !minLength) {
            return "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, and a number.";
        }
    }
    return true;
};

/**
 * Validates that a specified field in the newState object does not exceed a maximum length.
 * @param {string} field - The name of the field to validate.
 * @param {number} maxLength - The maximum allowed length for the field.
 * @returns {Function} - Returns a validator function configured for the specified field and length.
 */
export const maxLengthValidator = (field, maxLength) => (oldState, newState) => {
    if (field in newState && newState[field].length > maxLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${maxLength} characters.`;
    }
    return true;
};

/**
 * Validates that the 'date' field in the newState object matches a specified date format.
 * @param {string} format - The date format to validate against.
 * @returns {Function} - Returns a validator function configured for the specified format.
 */
export const dateFormatValidator = (format) => (oldState, newState) => {
    if ("date" in newState) {
        const date = newState.date;

        // Implement a simple date format check, e.g., YYYY-MM-DD
        const formatRegex = {
            "YYYY-MM-DD": /^\d{4}-\d{2}-\d{2}$/,
            "MM/DD/YYYY": /^\d{2}\/\d{2}\/\d{4}$/,
            // Add other formats as needed
        }[format];

        if (!formatRegex || !formatRegex.test(date)) {
            return `Date must be in the format ${format}.`;
        }
    }
    return true;
};

/**
 * Validates that a specified field in the newState object is unique compared to existing values.
 * @param {string} field - The name of the field to validate.
 * @param {Array} existingValues - An array of values to check against for uniqueness.
 * @returns {Function} - Returns a validator function configured for the specified field and existing values.
 */
export const uniqueValueValidator = (field, existingValues) => (oldState, newState) => {
    if (field in newState) {
        const value = newState[field];
        const currentValues = [...existingValues, oldState[field]].filter((v) => v !== undefined);

        if (currentValues.includes(value)) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique.`;
        }
    }
    return true;
};

/**
 * Validates that the 'phone' field in the newState object matches a valid phone number format.
 * @param {Object} oldState - The previous state of the object.
 * @param {Object} newState - The new state of the object to validate.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if validation passes.
 */
export const phoneNumberValidator = (oldState, newState) => {
    if ("phone" in newState) {
        const phone = newState.phone;

        // Simple phone number format check (e.g., 123-456-7890 or (123) 456-7890)
        const phoneRegex = /^(?:\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/;

        if (!phoneRegex.test(phone)) {
            return "Phone number must be in a valid format.";
        }
    }
    return true;
};

/**
 * Validates that a specified field in the newState object meets a minimum length requirement.
 * @param {string} field - The name of the field to validate.
 * @param {number} minLength - The minimum allowed length for the field.
 * @returns {Function} - Returns a validator function configured for the specified field and length.
 */
export const minLengthValidator = (field, minLength) => (oldState, newState) => {
    if (field in newState && newState[field].length < minLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters long.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object falls within a specified numeric range.
 * @param {string} field - The name of the field to validate.
 * @param {number} min - The minimum allowed value for the field.
 * @param {number} max - The maximum allowed value for the field.
 * @returns {Function} - Returns a validator function configured for the specified field and range.
 */
export const rangeValidator = (field, min, max) => (oldState, newState) => {
    if (field in newState && (newState[field] < min || newState[field] > max)) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be between ${min} and ${max}.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object contains only alphanumeric characters.
 * @param {string} field - The name of the field to validate.
 * @returns {Function} - Returns a validator function configured for the specified field.
 */
export const alphanumericValidator = (field) => (oldState, newState) => {
    if (field in newState) {
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(newState[field])) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} must be alphanumeric.`;
        }
    }
    return true;
};

/**
 * Validates that the 'url' field in the newState object matches a valid URL format.
 * @param {Object} oldState - The previous state of the object.
 * @param {Object} newState - The new state of the object to validate.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if validation passes.
 */
export const urlValidator = (oldState, newState) => {
    if ("url" in newState) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/;
        if (!urlRegex.test(newState.url)) {
            return "URL is invalid.";
        }
    }
    return true;
};

/**
 * Validates that a specified field in the newState object matches one of the allowed values.
 * @param {string} field - The name of the field to validate.
 * @param {Array} allowedValues - An array of allowed values for the field.
 * @returns {Function} - Returns a validator function configured for the specified field and allowed values.
 */
export const oneOfValidator = (field, allowedValues) => (oldState, newState) => {
    if (field in newState && !allowedValues.includes(newState[field])) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be one of ${allowedValues.join(", ")}.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object is equal to a given value.
 * @param {string} field - The name of the field to validate.
 * @param {*} compareTo - The value to compare against.
 * @returns {Function} - Returns a validator function configured for the specified field and comparison value.
 */
export const equalValidator = (field, compareTo) => (oldState, newState) => {
    if (field in newState && newState[field] !== compareTo) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be equal to ${compareTo}.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object matches a given regular expression.
 * @param {string} field - The name of the field to validate.
 * @param {RegExp} regex - The regular expression to validate against.
 * @param {string} [errorMessage] - An optional custom error message to return if validation fails.
 * @returns {Function} - Returns a validator function configured for the specified field and regex.
 */
export const regexValidator = (field, regex, errorMessage) => (oldState, newState) => {
    if (field in newState && !regex.test(newState[field])) {
        return errorMessage || `${field.charAt(0).toUpperCase() + field.slice(1)} does not match the required pattern.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object does not exceed a maximum number of items.
 * @param {string} field - The name of the field to validate.
 * @param {number} maxItems - The maximum number of items allowed for the field.
 * @returns {Function} - Returns a validator function configured for the specified field and item limit.
 */
export const maxItemsValidator = (field, maxItems) => (oldState, newState) => {
    if (field in newState && Array.isArray(newState[field]) && newState[field].length > maxItems) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot have more than ${maxItems} items.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object is not negative.
 * @param {string} field - The name of the field to validate.
 * @returns {Function} - Returns a validator function configured for the specified field.
 */
export const nonNegativeValidator = (field) => (oldState, newState) => {
    if (field in newState && newState[field] < 0) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be negative.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object matches the value of another field.
 * @param {string} field - The name of the field to validate.
 * @param {string} otherField - The name of the other field to compare against.
 * @returns {Function} - Returns a validator function configured for the specified fields.
 */
export const matchOtherFieldValidator = (field, otherField) => (oldState, newState) => {
    if (field in newState && newState[field] !== oldState[otherField] && newState[field] !== newState[otherField]) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must match ${otherField.charAt(0).toUpperCase() + otherField.slice(1)}.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object is a boolean.
 * @param {string} field - The name of the field to validate.
 * @returns {Function} - Returns a validator function configured for the specified field.
 */
export const isBooleanValidator = (field) => (oldState, newState) => {
    if (field in newState && typeof newState[field] !== "boolean") {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be a boolean.`;
    }
    return true;
};

/**
 * Validates that a specified field in the newState object starts with a given prefix.
 * @param {string} field - The name of the field to validate.
 * @param {string} prefix - The prefix that the field value must start with.
 * @returns {Function} - Returns a validator function configured for the specified field and prefix.
 */
export const startsWithValidator = (field, prefix) => (oldState, newState) => {
    if (field in newState && !newState[field].startsWith(prefix)) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must start with "${prefix}".`;
    }
    return true;
};