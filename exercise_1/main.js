console.log("\n---------- ZADANIE 1 ----------\n");

function map(fn, array) {
    var a = [];

    for(var i = 0; i < array.length; i++) {
        if(i in array) {
            a[i] = fn.call(null, array[i]);
        }
    }

    return a;
}

var z1 = map(function(x){return x*x;}, [1,2,3]); // -> [1,4,9]
console.log(z1);

console.log("\n---------- ZADANIE 2 ----------\n");

function toArray() {
    return Array.prototype.slice.call(arguments[0], arguments[1]);
}

function bind(fn) {
    var args = toArray(arguments, 1);

    return function() {
        return fn.apply(null, args.concat(toArray(arguments)));
    };
}

function pow(x) {
    return x*x;
}

var mapToPow2 = bind(map, pow);

console.log(mapToPow2([1,2,3])); // -> [1,4,9]

function add3Numbers(x,y,z) {
    return x + y + z;
}

var add_5_and_6 = bind(add3Numbers, 5,6);
console.log(add_5_and_6(7)); // -> 18
console.log(add_5_and_6(8)); // -> 19

var add_1 = bind(add3Numbers, 1);
var add_1_and_2 = bind(add_1, 2);
console.log(add_1_and_2(3)); // -> 6

console.log("\n---------- ZADANIE 3 ----------\n");

function plus(a,b) {
    return a+b;
}
function reduce(fn, array) {
    var len = array.length,
        i   = 0,
        ff  = [];

for(i; i < len; i++) {
    rv = array[i];

    for(j=i+1; j < len; j++){
        ff = fn.call(null, rv, array[j])
    }
}


     return ff;

}
var array             = reduce(plus, [1,2,3,4,6]); // -> [4,6]
var associative_array = reduce(function(a,b){
  return [
    a[0]+b[0],
    a[1]+b[1]];
}, [[1,2],[3,4]]); // -> [4,6]

console.log(array);
console.log(associative_array);

console.log("\n---------- ZADANIE 4 ----------\n");

function partition(fn, array) {
    var fun,
        ar  = [],
        ar1 = [],
        ar2 = [];

    for(i = 0; i < array.length; i++) {
        var fun = fn.call(null, array[i]);

        if(fun == true) {
            ar1.push(array[i]);
        } else {
            ar2.push(array[i]);
        }
    }

    ar = [ar1, ar2];
    
    return ar;

    
}
function even(x) {
  return x%2;
}

var partition = partition(even, [1,2,3,4,5,6,7,8,9,10]) // -> [[1,3,5,7,9], [2,4,6,8,10]]
console.log(partition);






