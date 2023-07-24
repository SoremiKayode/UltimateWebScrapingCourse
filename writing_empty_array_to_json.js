const fs = require('fs');
/*
This file write a javascript object to a JSON file
The function arrayToJSON requires two parameter :
the newArray or object and file path to the JSON file
*/
const arrayToJson = (dataArray, filePath) => {
/*
we convert the array into a JSON object
and write it to a json file
*/
const jsonData = JSON.stringify(dataArray, null, 2);
fs.writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('Array written to JSON file successfully.');
  }
});
}

module.exports = arrayToJson;