let numbers = [4, 8, 15, 16, 23, 42];// array
let dizi = new Array(4, 8, 15, 16, 23, 42);
console.log(`numbers.length=${numbers.length}`)
console.log(`numbers[0]=${numbers[0]}`)
console.log(`numbers[1]=${numbers[1]}`)
console.log(`numbers[5]=${numbers[5]}`)
// external loop #1
for (let i = 0; i < numbers.length; ++i) {
    console.log(`numbers[${i}]=${numbers[i]}`);
}
// external loop #2
for (let i in numbers) {
    console.log(`numbers[${i}]=${numbers[i]}`);
}
// external loop #3
for (let number of numbers) {
    console.log(`${number}`);
}
// external loop #4
for (let [i, number] of numbers.entries()) {
    console.log(`numbers[${i}]=${number}`);
}
// internal loop #5
numbers.forEach(function(number,i){
    console.log(`numbers[${i}]=${number}`);
});