numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ifEven = n => {
    console.log(`ifEven(${n})`);
    return n % 2 === 0;
}
const to_cube = u => {
    console.log(`to_cube(${u})`);
    return u ** 3;
}
const add = (accumulator, n) => {
    console.log(`add(${accumulator},${n})`);
    return accumulator + n;
}

function* filter(array, predicateFun) {
    for (let element of array) {
        if (predicateFun(element))
            yield element;
    }
}

function* map(array, mapperFun) {
    for (let element of array) {
        yield mapperFun(element);
    }
}

function reduce(array, reduceFun, initValue) {
    let accumulator = initValue;
    for (let element of array) {
        accumulator = reduceFun(accumulator, element);
    }
    return accumulator;
}

let sum = reduce(map(filter(numbers, ifEven), to_cube), add, 0);
console.log(`sum: ${sum}`);
