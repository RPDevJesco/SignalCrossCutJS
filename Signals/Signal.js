/**
 * Represents a reactive signal for managing and observing state changes with built-in validation and parsing capabilities.
 * @class
 */
export class Signal {
    /**
     * Creates an instance of Signal.
     * @param {any} initialValue The initial value of the signal.
     * @param {Function[]} validators An array of validation functions that will check the state before it is updated. Each function should return true for a valid state or an error message string for an invalid state.
     * @param {Function[]} parsers An array of parsing functions that will process the new value before validation. Each function must return the parsed value or throw an error if parsing fails.
     */
    constructor(initialValue, validators = [], parsers = []) {
        this.value = initialValue;
        this.validators = validators;
        this.parsers = parsers;
        this.subscriptions = new Set();
        this.context = [];
    }

    /**
     * Updates the signal's value after parsing and validating the new value. Notifies all subscribers if the update is successful.
     * @param {any} newValue The new value to be set.
     */
    write(newValue) {
        let value = newValue;

        // Parse the new value
        for (const parse of this.parsers) {
            try {
                value = parse(value);
            } catch (error) {
                console.error(error.message);
                return;
            }
        }

        // Validate the new state
        const validationResults = this.validators.map(validator => validator(this.value, value));
        const errors = validationResults.filter(result => result !== true);
        if (errors.length > 0) {
            console.error('Validation errors:', errors);
            return;
        }

        // If all validations pass, update the value and notify subscribers
        this.value = value;
        for (const observer of this.subscriptions) {
            observer.execute();
        }
    }

    /**
     * Reads the current value of the signal. Automatically subscribes the current effect in context to changes.
     * @returns {any} The current value of the signal.
     */
    read() {
        const observer = this.context[this.context.length - 1];
        if (observer) {
            this.subscriptions.add(observer);
        }
        return this.value;
    }

    /**
     * Creates an effect that reacts to changes in the Signal. The effect will execute immediately and whenever the Signal is written to.
     * @param {Function} fn The function to execute as part of the effect.
     * @returns {Object} An effect object with an execute method.
     */
    createEffect(fn) {
        const effect = {
            execute: () => {
                this.context.push(effect);
                fn();
                this.context.pop();
            }
        };

        effect.execute();
        return effect;
    }

    /**
     * Subscribes a function to changes in the Signal. The function will be called whenever the Signal's value changes.
     * @param {Function} fn The function to call when the Signal updates.
     * @returns {Function} A function to unsubscribe the passed function from further updates.
     */
    subscribe(fn) {
        const effect = {
            execute: fn
        };

        this.subscriptions.add(effect);
        return () => this.subscriptions.delete(effect);
    }
}