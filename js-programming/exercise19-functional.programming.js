numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let sum = 0
for (let number of numbers) {
    if (number % 2 === 0) {
        const cubed = number ** 3;
        sum += cubed;
    }
}
const ifEven = n => n % 2 === 0;
const to_cube =  u => u ** 3
const add = (accumulator,evenNumber) => accumulator+evenNumber
console.log(`sum: ${sum}`);
sum = numbers.filter(ifEven)
             .map(to_cube)
             .reduce(add, 0);
console.log(`sum: ${sum}`);
