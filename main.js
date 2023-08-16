// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers

const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

const validateCred = (cardDigits) => {
  //make a copy of array to avoid mutation
  const digits = cardDigits.slice();

  //1. Check digit, iterate to the left
  digits.reverse();

  // Initialize variable to keep track the sum of digits after applying Luhn algorithm
  let totalSum = 0;

  for (let i = 0; i < digits.length; i++) {
    // Check if the current index 'i' is odd indexes.
    if (i % 2 !== 0) {
      // Double the digit and stores in doubled
      let doubled = digits[i] * 2;

      // Check if doubled is > 9, then subtract with 9
      if (doubled > 9) {
        doubled -= 9;
      }

      // Add the doubled value to the total sum
      totalSum += doubled;
    } else {
      // if the index is even, value of current digit directly added to totalSum
      totalSum += digits[i];
    }
  }
  // Check if the sum modulo 10 is 0 to check validity
  return totalSum % 10 === 0;
};

// Test functions:
console.log(validateCred(valid1)); // Should print true
console.log(validateCred(invalid1)); // Should print false

// takes a nested array as its parameter
const findInvalidCards = (cardsArray) => {
  // Initialize an empty array to store the nested arrays of invalid cards
  const invalidCards = [];

  // iterate each cardDigits array in the cardArray
  for (const cardDigits of cardsArray) {
    // check if the current cardDigits is invalid, push the cardDigits into the invalid card array
    if (!validateCred(cardDigits)) {
      invalidCards.push(cardDigits);
    }
  }

  // return the nested array of invalid credit card
  return invalidCards;
};

// Test function
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])); // Shouldn't print anything
console.log(
  findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])
); // Should print all of the numbers

console.log(findInvalidCards(batch)); // Test what the mystery numbers are

// takes an array of invalid credit cards number
const idInvalidCardCompanies = (invalidCardsArray) => {
  // Initialize empty array
  const companies = [];

  // starts a loop that iterates each cardDigit array in the invalidCardsArray
  for (const cardDigits of invalidCardsArray) {
    //extract first digit from the cardDigits and assign it to the variable
    const firstDigit = cardDigits[0];

    // Initialize string name company
    let company = "";

    // check appropriate first digit and assign it to the company
    switch (firstDigit) {
      case 3:
        companyName = "Amex (American Express)";
        break;
      case 4:
        companyName = "Visa";
        break;
      case 5:
        companyName = "Mastercard";
        break;
      case 6:
        companyName = "Discover";
        break;
      default:
        companyName = "Company not found";
    }

    //This checks if the companyName is not already in the companies array. If it's not included, the name is added to the array using companies.push(companyName)
    if (!companies.includes(companyName)) {
      companies.push(companyName);
    }
  }
  return companies;
};

// Test function:
console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards

const stringToNumberArray = (string) => {
  return string.split("").map(Number);
};

const convertToValid = (invalidCardArray) => {
  // Remove the last digit (check digit) from the invalid card array
  const truncatedArray = invalidCardArray.slice(0, -1);

  // Validate the truncated array
  const isValid = validateCred(truncatedArray);

  if (isValid) {
    return invalidCardArray;
  }

  // Calculate the correct check digit
  const correctCheckDigit =
    (10 -
      (truncatedArray.reduce((acc, num, index) => {
        if (index % 2 === truncatedArray.length % 2) {
          num *= 2;
          if (num > 9) {
            num -= 9;
          }
        }
        return acc + num;
      }, 0) %
        10)) %
    10;

  // Return the invalid card array with the correct check digit
  return [...truncatedArray, correctCheckDigit];
};

/*
const invalidCardString = "4532778771091795";
const invalidCardArray = stringToNumberArray(invalidCardString);
console.log("Invalid Card Array:", invalidCardArray);

const validConvertedArray = convertToValid(invalidCardArray);
console.log("Converted to Valid:", validConvertedArray);
*/
