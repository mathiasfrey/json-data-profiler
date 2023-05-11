// create a js function that runs on the command line for testing
// const generate_package_name = require("./helpers");
// const CSV2XML = require("./csv-2-xml.js");

RESULT = []

const fs = require('fs');

console.log("Run fron CLI");



const jsonFile = process.argv[2];
const data = JSON.parse(
    fs.readFileSync(jsonFile).toString()
    );

console.log('Byte length:', fs.readFileSync(jsonFile).byteLength);
console.log(traverse(data));

console.log(JSON.stringify(RESULT));


function traverse(obj, depth = 0, result=RESULT) {

    // TODO: a simple array input does not work [1,2,3]
    // console.log('>>>', obj, typeof obj);
    // console.log(Array.isArray(obj));

    // iterate over all keys
    for (let key in obj) {
      // yet, only consider "own" keys
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        let type = typeof value;

        console.log(`${' '.repeat(depth * 2) } ${key}: ${type}`);
        
        // result["name"] = key; 
        // result["type"] = type;

        if (Array.isArray(value)) {
          // process array
          
          
          processArray(value, depth);
          // do not traverse arrays of str or int
          if ((typeof value[0] === 'object') || Array.isArray(value[0])) {
            var children = [];
            result.push({"name": key, "type": "Array", length: value.length, "children": children})
            traverse(value[0], depth + 1, children);
          } else {
            // this is an array of num or str
            result.push({"name": key, "type": `Array of ${typeof value[0]}`, length: value.length})
          }

        } else if (type === 'object') {
          // process nested object
          var children = [];
          result.push({"name": key, "type": type, "children": children})
          traverse(value, depth + 1, children);
        } else if (type === 'string') {
          result.push({"name": key, "type": type})
          //console.log(key, value, 'STR');
        } else if (type == 'number') {
          result.push({"name": key, "type": type})
        } else {
          // process other data types
          console.log('ELSE');
        }
      }
    }
  }


  function processArray(arr, depth) {
    if (isHomogeneous(arr)) {
        console.log(`${' '.repeat(depth * 2)}A homogeneous array of type ${typeof arr[0]}`)
    }
    console.log(`${' '.repeat(depth * 2)}Array of length ${arr.length}`)
  }

  function isHomogeneous(arr) {
    return arr.every((element) => typeof element === typeof arr[0]);
  }