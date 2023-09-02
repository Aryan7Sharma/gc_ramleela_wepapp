const fs = require('fs').promises;

async function readExistingReceiptNumbers(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {}; // Return an empty object if the file does not exist
  }
}

async function writeReceiptNumbersToFile(filePath, receiptNumbers) {
  await fs.writeFile(filePath, JSON.stringify(receiptNumbers, null, 2));
}

function generateUniqueRandomNumber(existingNumbers) {
  let randomNumbers;
  do {
    randomNumbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate a 4-digit random number
  } while (existingNumbers.includes(randomNumbers));
  return randomNumbers;
}

async function generateUniqueReceiptNumber(existingReceiptNumbers) {
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based

  const yearMonthKey = `${currentYear}${currentMonth}`;
  if (!existingReceiptNumbers[yearMonthKey]) {
    existingReceiptNumbers[yearMonthKey] = [];
  }

  const keyArray = existingReceiptNumbers[yearMonthKey];
  const randomNumbers = generateUniqueRandomNumber(keyArray);
  keyArray.push(randomNumbers);
  await writeReceiptNumbersToFile(`${__dirname}/assets/generated_receipt_numbers.json`, existingReceiptNumbers); // Write the updated receipt numbers to the file

  const receiptNumber = `e${yearMonthKey}${randomNumbers}`;
  return receiptNumber;
}

async function getReceiptNumber() {
  const existingReceiptNumbers = await readExistingReceiptNumbers(`${__dirname}/assets/generated_receipt_numbers.json`);
  const uniqueReceiptNumber = await generateUniqueReceiptNumber(existingReceiptNumbers);
  return uniqueReceiptNumber;
}

module.exports = getReceiptNumber;
