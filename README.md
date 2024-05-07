# SignalCrossCutJS

This project provides a comprehensive toolkit for Aspect-Oriented Programming (AOP) using Signals and a robust validation and parsing system, designed to enhance software development practices by facilitating clean separation of concerns and robust data handling. It is ideal for developers looking to implement cross-cutting concerns such as logging, validation, and error handling efficiently without cluttering core business logic.

### Description

### Aspect-Oriented Programming (AOP) Toolkit

The AOPToolkit class in this project allows developers to cleanly separate cross-cutting concerns from the main business logic of their applications. It supports various types of advices such as before, after, around, afterReturning, and afterThrowing, enabling developers to:

    Execute additional logic before or after the main function runs.
    Manage the execution flow around a function, deciding when and if the main function should execute.
    Handle exceptions uniformly across functions.
    This toolkit is particularly useful in scenarios where the same kind of logic needs to be applied to multiple functions or methods, such as logging, authentication, or error handling.

### Signal and Reactive Programming

The Signal class provides a mechanism for reactive programming, allowing values to be observed and reacted upon as they change. It integrates parsing and validation layers, ensuring that any updates to the observed values are properly validated and transformed before being propagated. This class can be used to create responsive applications where changes in state immediately trigger updates in the UI or other dependent components.
Validators and Parsers

The project includes a rich set of validator and parser functions that can be applied to data inputs to ensure they meet defined criteria before being processed or stored. Validators check for conditions like non-empty strings, valid age ranges, or email formats, while parsers transform inputs into usable data formats (like integers, dates, or booleans). These utilities help in maintaining data integrity and consistency across the application.

### Target Audience

This project is suited for:

    Backend Developers: Who require robust mechanisms to handle cross-cutting concerns and data validation.
    Frontend Developers: Interested in implementing reactive programming patterns to build dynamic and responsive interfaces.
    Software Architects: Looking for ways to enforce coding best practices and separation of concerns within large codebases.
    Web Developers: Who need to ensure robust data handling and prevent common security issues like XSS through input sanitization.

Overall, this toolkit serves as an essential resource for developers at all levels who aim to build more maintainable, scalable, and secure applications.

## Features

- Robust error handling for invalid inputs
- Functions for parsing integers, positive integers, floats, booleans, dates, and JSON
- Sanitization and normalization of strings to prevent XSS attacks
- Currency parsing to handle financial data
- Date-time parsing to ISO 8601 format

## Getting Started

### Dependencies

- No Dependencies, written in vanilla JS with ES6 modules.

### Installing

- Clone the repository using `git clone https://github.com/your-repo/project-name.git`

```javascript
import { integerParser, dateParser } from './Parsing/Parsers';

const parsedInt = integerParser('123');
const parsedDate = dateParser('2023-01-01');
```

### Usage
Here's how to use the individual parsing functions:

- Integer Parsing

```javascript
import { integerParser } from './Parsing/Parsers';

try {
  const result = integerParser('42');
  console.log(result); // 42
} catch (error) {
  console.error(error.message);
}
```

- Date Parsing

```javascript
import { dateParser } from './Parsing/Parsers';

try {
  const result = dateParser('2023-01-01');
  console.log(result); // '2023-01-01'
} catch (error) {
  console.error(error.message);
}
```

## Problems Solved
This project addresses several key issues commonly encountered in software development, making it a valuable tool for developers. Here are the main problems it solves:

### 1. Separation of Concerns

#### Problem: 
Traditional programming often intermingles cross-cutting concerns (like logging, security, or error handling) with business logic, making the code harder to maintain and understand.

#### Solution: 
The AOPToolkit provides mechanisms to separate these concerns from the business logic. By using advices like before, after, and around, developers can cleanly insert additional behavior without modifying the original functions, leading to cleaner and more modular code.

### 2. Code Duplication

#### Problem: 
Implementing functionalities like logging or validation across multiple points in an application can lead to repetitive and error-prone code.

#### Solution:
The AOP approach minimizes duplication by allowing shared behaviors to be defined once and applied across multiple functions or methods. This not only reduces the likelihood of errors but also simplifies maintenance.

### 3. Reactive Programming Complexity

#### Problem: 
Managing state changes and their effects on the application (like UI updates) can be complex and error-prone, especially in large-scale applications.

#### Solution: 
The Signal class enables reactive programming by allowing developers to manage and observe state changes efficiently. This simplifies the creation of dynamic, responsive applications where state changes propagate automatically and reliably to all interested subscribers.

### 4. Data Validation and Transformation

#### Problem: 
Ensuring data integrity and proper data formatting can be cumbersome and often requires extensive boilerplate code, especially when dealing with various data sources and formats.

#### Solution: 
The project includes a comprehensive set of validators and parsers that can be integrated seamlessly into data handling workflows. These functions validate conditions (like email formats, age ranges, or password strength) and transform raw inputs into structured, usable formats, enhancing both security and usability.

### 5. Error Handling

#### Problem: 
Consistently managing errors and exceptions across different parts of an application can be challenging, often leading to inconsistent user experiences and debugging difficulties.

#### Solution: 

With methods like afterThrowing, the AOPToolkit allows centralized and uniform error handling policies to be applied wherever needed. This not only improves reliability but also simplifies the process of managing unexpected issues.

### 6. Application Scalability and Maintenance

#### Problem: 
As applications grow, the interdependencies and complexities can make them harder to scale and maintain.

#### Solution:
By encouraging modular architecture and providing tools for efficient data handling and observation, the project facilitates easier scaling and maintenance. Developers can update or enhance one part of the application without impacting others, supporting a more sustainable development lifecycle.

This project is particularly beneficial in environments where robustness, scalability, and maintainability are key concerns, helping teams to develop cleaner, more efficient, and more reliable software.