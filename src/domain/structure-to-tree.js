
function getTree(obj) {

    var result = [];

    traverse(obj, 0, result);

    if (result.length === 1) {
        // tree data struc "often" is an obj; not array that is just
        // a consequece of pushing into result
        return result[0]; 
    }
    // yet, it can also be a "real" array
    return {"name": "ROOT", "type": "Array", "children":result}; 

}

function traverse(obj, depth, result) {

    // TODO: a simple array input does not work [1,2,3]
    // console.log('>>>', obj, typeof obj);
    // console.log(Array.isArray(obj));

    // iterate over all keys
    for (let key in obj) {
        // yet, only consider "own" keys
        if (obj.hasOwnProperty(key)) {

            let value = obj[key];
            let type = typeof value;

            console.log(`${' '.repeat(depth * 2)}${key}: ${type}`);

            if (Array.isArray(value)) {
                // process array  
                // console.log('HER', value);
                processArray(value, depth);
                // do not traverse arrays of str or int
                if ((typeof value[0] === 'object') || Array.isArray(value[0])) {
                    var children = [];
                    result.push({ "attributes": {"type": "Array", length: value.length}, "name": key, "children": children })
                    traverse(value[0], depth + 1, children);
                } else {
                    // this is an array of num or str
                    result.push({ "attributes": {"type": `Array of ${typeof value[0]}`, length: value.length}, "name": key })
                }

            } else if (type === 'object') {
                // process nested object
                children = [];
                result.push({ "name": key, "attributes": {"type": type}, "children": children })
                traverse(value, depth + 1, children);
            } else if (type === 'string') {
                result.push({ "name": key, "attributes": {"type": type} })
                // console.log(key, value, 'STR');
            } else if (type === 'number') {
                result.push({ "name": key, "attributes": {"type": type} })
            } else if (type === 'boolean') {
                result.push({ "name": key, "attributes": {"type": type} })
            } else {
                // process other data types
                console.log('WARNING: UNSUPPORTED DATA TYPE');
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

module.exports = {getTree: getTree};