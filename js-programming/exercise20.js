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
let sum = numbers.filter(ifEven)
    .map(to_cube)
    .reduce(add, 0);
console.log(`sum: ${sum}`);
