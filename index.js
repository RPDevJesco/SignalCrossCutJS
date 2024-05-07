import { AOPToolkit } from './AOP/AOPToolkit.js';
import { nonEmptyNameValidator, ageRangeValidator, emailValidator, positiveNumberValidator, requiredFieldsValidator,
    passwordStrengthValidator, maxLengthValidator, dateFormatValidator, uniqueValueValidator, phoneNumberValidator,
    minLengthValidator, rangeValidator, alphanumericValidator, urlValidator, oneOfValidator, equalValidator,
    regexValidator, maxItemsValidator, nonNegativeValidator, matchOtherFieldValidator, isBooleanValidator,
    startsWithValidator } from './Validation/Validators.js';
import { Signal } from './Signals/Signal.js';
import { integerParser, positiveIntegerParser, stringParser, dateParser, floatParser, booleanParser,
    jsonParser, arrayParser, trimParser, dateTimeParser, currencyParser } from "./Parsing/Parsers.js";

const signal = new Signal(10);

const logAdvice = (args) => console.log(`Signal will update with value: ${args}`);

// Wrap the write method with logging
signal.write = AOPToolkit.before(signal.write, logAdvice);

// Ensure the log correctly captures the value
signal.write(20); // Logs "Signal will update with value: 20"

const parseAndValidateName = (args) => {
    // Apply string parsing before setting the name
    const parsedName = stringParser(args);
    // Ensure args is defined after parsing
    if (!parsedName) {
        throw new Error("Name must be provided and must not be empty.");
    }
    // Validate the parsed name
    const validationResult = nonEmptyNameValidator({}, { name: parsedName });
    if (validationResult !== true) {
        throw new Error(validationResult);
    }
    return parsedName; // Return the validated, parsed name for further use
};

// Modify the setName function to accept the processed name directly
const setName = (processedName) => {
    console.log(`Name set to ${processedName}`);
};

// Wrap setName with parsing and validation
const validatedAndParsedSetName = AOPToolkit.before(setName, parseAndValidateName);

validatedAndParsedSetName("   John Doe   "); // Works fine and logs "Name set to john doe"
// validatedAndParsedSetName(" "); // Throws Error: Name must be provided and must not be empty.

const processData = (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    console.log("Processing data:", data);
};

const handleError = (error) => {
    console.error("Error occurred:", error.message);
};

const safeSetName = AOPToolkit.afterThrowing(validatedAndParsedSetName, handleError);

safeSetName("   Jane Doe   "); // Works fine and logs "Name set to jane doe"
//safeSetName(""); // Logs "Error occurred: Name must be provided and must not be empty."

// Wrap processData to handle errors
const safeProcessData = AOPToolkit.afterThrowing(processData, handleError);

// safeProcessData(null); // Logs "Error occurred: No data provided" and re-throws the error

const startTimer = () => console.time("ExecutionTime");
const endTimer = () => console.timeEnd("ExecutionTime");

const compute = () => {
    // Simulate a heavy computation
    for (let i = 0; i < 1e6; i++) {}
    console.log("Computation completed");
};

// Wrap compute to measure execution time
const timedCompute = AOPToolkit.around(compute, (targetFunction, args) => {
    startTimer();
    const result = targetFunction.apply(this, args);
    endTimer();
    return result;
});

timedCompute();