function myEach(collection, alert) {
  console.log("collection: ", collection);
  if (typeof(collection) === "object") {
    console.log("typeof(collection): object");

    const valueCollection = Object.values(collection);
    console.log("valueCollection: ", valueCollection);

    valueCollection.forEach((value) => {
      alert(value);
    });

    return collection;
  }
}

// Attempt to use one of the ideas from either of the 'printCard' function:
// https://learning.flatironschool.com/courses/5284/pages/the-lost-context-bug-code-along?module_item_id=376038
function myMap(collection, callback, acc) {
  collection.forEach((element) => {
    console.log("element: ", element);
    console.log("this.callback(element): ", this.callback(element));
  });
}

const unmodifiedTestArr = [1, 2, 3, 4];
const unmodifiedTestObj = {one: 1, two: 2, three: 3, four: 4};

let myEachResult1 = myEach(unmodifiedTestArr, alert);
let myEachResult2 = myEach(unmodifiedTestObj, alert);

console.log("myEachResult1: ", myEachResult1);
console.log("myEachResult2: ", myEachResult2);

const testArr = unmodifiedTestArr.slice();
const testObj = Object.assign({}, unmodifiedTestObj);
const callbackFunction = (x) => (x * 3);

const arrResult = myMap(testArr, callbackFunction);
