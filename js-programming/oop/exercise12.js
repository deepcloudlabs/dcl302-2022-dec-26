let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let dizi = [...numbers];
let [first, second, ...rest] = numbers;
console.log(first);
console.log(second);
console.log(rest);