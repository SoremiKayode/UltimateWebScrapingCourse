const fs = require('fs');

/*
This file write an object to a json file
if the file is not existing it create a new file
The function writeToJson takes requires two
parameters; the file path : filePath, and the new javascript
object you want to write to json
*/

const writeToJson = (filePath, newPerson) => {
/*
here will use nodejs file module to load 
the json file 
*/
fs.readFile(filePath, 'utf8', (err, data) => {
if (err) {
console.error('Error reading the file:', err);
}

try {
/* 
Here we :
- Parse the JSON data into a JavaScript object
- push the new javascript object into it
- convert it back to a JSON object
- then write it back to the file
 */
const jsonData = JSON.parse(data);
jsonData.push(newPerson);
const updatedJsonData = JSON.stringify(jsonData, null, 2);
fs.writeFile(filePath, updatedJsonData, (err) => {
if (err) {
console.error('Error writing to file:', err);
}
console.log('New person added to the JSON file successfully.');
});
} catch (parseError) {
console.error('Error parsing JSON data:', parseError);
}
});
}

module.exports = writeToJson;