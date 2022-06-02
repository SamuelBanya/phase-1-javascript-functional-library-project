function sanitizeCollection(collection) {
  // console.log("typeof(collection): ", typeof(collection));
  // return collection instanceof Array ? collection : Object.value(collection);
  if (typeof(collection) === "object") {
    const valueCollection = Object.values(collection);
    console.log("valueCollection: ", valueCollection);

    return valueCollection;
  }

  return collection;
}

function printTesting(functionName) {
  console.log("________________________");
  console.log(`Testing ${functionName}() function:`);
}

function printFunction(functionName) {
  console.log("________________________");
  console.log(`Inside ${functionName}() function:`);
}

function myEach(collection, alert) {
  printFunction("myEach");
  console.log("collection: ", collection);
  let valueCollection = sanitizeCollection(collection);
  valueCollection.forEach((value) => {
    alert(value);
  });

  return collection;
}

// Attempt to use one of the ideas from either of the 'printCard' function:
// https://learning.flatironschool.com/courses/5284/pages/the-lost-context-bug-code-along?module_item_id=376038
function myMap(collection, callback) {
  printFunction("myMap");

  let modifiedCollection = [];
  if (typeof(collection) === "object") {
    const valueCollection = Object.values(collection);
    console.log("valueCollection: ", valueCollection);
    valueCollection.forEach((element) => {
      console.log("element: ", element);
      console.log("callback: ", callback);
      let modifiedElement = callback(element);
      console.log("modifiedElement: ", modifiedElement);
      modifiedCollection.push(modifiedElement);
    });
  }

  console.log("modifiedCollection: ", modifiedCollection);

  return modifiedCollection;
}

function myReduce(collection, callback, acc) {
  printFunction("myReduce");
  let newCollection = sanitizeCollection(collection);
  console.log("newCollection: ", newCollection);
  // TODO:
  // From the assignment itself (quote):
  // If a start value is not passed to myReduce, the first value in the collection should be used as the start value.
  // With this in mind:
  // 1. Create the accumulator by setting it to the first element of the array if not present
  if (!acc) {
    acc = newCollection[0];
    // 2. Make sure to skip the accumulator to prevent any doubling up on actions from occurring
    // Aka, we need to remove the very first element of the array with .slice():
    newCollection = newCollection.slice(1, newCollection.length);
  }
  console.log("newCollection (before .forEach()) loop: ", newCollection);
  console.log("acc (before .forEach()) loop: ", acc);

  newCollection.forEach((val) => {
    console.log("val: ", val);
    console.log(`(acc: ${acc}) + (val: ${val} * 3) = ${callback(acc, val, newCollection)}`);
    acc = callback(acc, val, newCollection);
    return acc;
  });

  return acc;
}

function myFind(collection, predicate) {
  printFunction("myFind");
  let newCollection = sanitizeCollection(collection);
  console.log("newCollection: ", newCollection);
  for (let i = 0; i < newCollection.length; i++) {
    console.log(`newCollection[${i}]: ${newCollection[i]}`);
  // newCollection.forEach((val) => {
    // console.log("val: ", val);
    // NOTE: This is the Mocha test function
    // The general idea is this:
    // The function takes in a 'target' value
    // It then calls an anonymous function to take in the current iteration of the collection you're iterating through
    // It will then check to see if the current element, 'currEl' matches the 'target'
    // If so, it will return true
    // If not, you need to then make it keep calling the callback function
    if (predicate(newCollection[i])) {
      // console.log("val === target");
      console.log("target found");
      return newCollection[i];
      // return val;
    }
  }
  console.log("target not found");
  return undefined;
}

function myFilter(collection, predicate) {
  printFunction("myFilter");
  let newCollection = sanitizeCollection(collection);

  let matchArray = [];

  newCollection.forEach((val) => {
    if(predicate(val)) {
      matchArray.push(val);
    }
  });

  console.log("matchArray: ", matchArray);
  return matchArray;
}

printTesting("myEach");
const unmodifiedTestArr = [1, 2, 3, 4];
const unmodifiedTestObj = {one: 1, two: 2, three: 3, four: 4};

let myEachResult1 = myEach(unmodifiedTestArr, alert);
let myEachResult2 = myEach(unmodifiedTestObj, alert);

console.log("myEachResult1: ", myEachResult1);
console.log("myEachResult2: ", myEachResult2);

printTesting("myMap");
const testArr = unmodifiedTestArr.slice();
const testObj = Object.assign({}, unmodifiedTestObj);
const callbackFunction = (x) => (x * 3);
const arrResult = myMap(testArr, callbackFunction);

printTesting("myReduce");
const reduceTestArr = unmodifiedTestArr.slice();
const reduceTestObj = Object.assign({}, unmodifiedTestObj);
const callback = (acc, val, collection) => (acc + (val * 3));
myReduce(reduceTestArr, callback, 10);
myReduce(reduceTestArr, callback);
let objsEqualResult = reduceTestObj === unmodifiedTestObj;
console.log("objsEqualResult: ", objsEqualResult);
// Output: 3, 6, 9, 12
// 10 + 3 => 13
// 13 + 6 => 19
// 19 + 9 => 28
// 28 + 12 => 40

printTesting("myFind");
// NOTE:
// The 'predicate' is:
// a callback function that returns true or false

// From Mocha Test:
function findCBGenerator(target) {
  return (function(currEl) { return target === currEl; });
}

const intArr = [-1, 4, 0, 1, 3, 2, 3, 4, 5, 6];
const strArr = ["maru", "choux", "doge", "coco", "waychillgoldeneye", "trance"];
const objB = {b: 'b'};
const objArr = [{a: 'a'}, objB];

myFind(intArr, findCBGenerator(4));
myFind(strArr, findCBGenerator("waychillgoldeneye"));
myFind(objArr, findCBGenerator(objB));

printTesting("myFilter");
let filterArray = [1, 2, 3, 4, 5, 6];
myFilter(filterArray, function(num){ return num % 2 == 0; });
