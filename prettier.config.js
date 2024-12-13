//prettier.config.js
module.exports = {
    plugins: ["prettier-plugin-tailwindcss"],
    // Prettier Options
    semi: true, // Enable semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double quotes
    trailingComma: 'es5', // Include trailing commas where valid in ES5 (objects, arrays, etc.)
    tabWidth: 2, // Set the number of spaces per indentation level
    printWidth: 80, // Specify the line length that the printer will wrap on
    bracketSpacing: true, // Print spaces between brackets in object literals
    jsxBracketSameLine: false, // Put the > of a multi-line JSX element at the end of the last line
};
