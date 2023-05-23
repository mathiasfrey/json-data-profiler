// create a js function that runs on the command line for testing
// const generate_package_name = require("./helpers");
// const CSV2XML = require("./csv-2-xml.js");

const Struc2Tree = require("./domain/structure-to-tree");

const fs = require('fs');

console.log("Run fron CLI");



const jsonFile = process.argv[2];
const data = JSON.parse(
    fs.readFileSync(jsonFile).toString()
    );

console.log('Byte length:', fs.readFileSync(jsonFile).byteLength);

// console.log(Struc2Tree.getTree(data));
var r = Struc2Tree.getTree(data);

console.log(JSON.stringify(r));