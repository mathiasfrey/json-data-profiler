// create a js function that runs on the command line for testing
// const generate_package_name = require("./helpers");
// const CSV2XML = require("./csv-2-xml.js");

const fs = require('fs');

console.log("Run fron CLI");



const jsonFile = process.argv[2];
const data = JSON.parse(
    fs.readFileSync(jsonFile).toString()
    );

console.log('Byte length:', fs.readFileSync(jsonFile).byteLength);
console.log(traverse(data));



function traverse(obj) {

    // TODO: a simple array input does not work [1,2,3]
    // console.log(typeof obj);
    // console.log(Array.isArray(obj));

    // iterate over all keys
    for (let key in obj) {
      // yet, only consider "own" keys
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        let type = typeof value;
        
        if (Array.isArray(value)) {
          // process array
          console.log(111);
          processArray(value);

        } else if (type === 'object') {
          // process nested object
          traverse(value);
        } else if (type === 'string') {
          console.log(222);
        } else if (type == 'number') {
            console.log('NUM');
        } else {
          // process other data types
          console.log('ELSE');
        }
      }
    }
  }


  function processArray(arr) {
    if (isHomogeneous(arr)) {
        console.log(`A homogeneous array of type ${typeof arr[0]}`)
    }
  }

  function isHomogeneous(arr) {
    return arr.every((element) => typeof element === typeof arr[0]);
  }