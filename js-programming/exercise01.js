// 0. Functions
//    Generator Function ✔, Asynchronous Function ✘
// 1. Functional Programming
//     i) Higher-Order Function ✔
//    ii) Pure Function: Lambda Expression/Arrow Function ✔
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// forEach is a HoF
numbers.forEach(function (number, index) {
    console.log(`${index}'th element is ${number}`)
})
const printElement = (number, index) => console.log(`${index}'th element is ${number}`)
numbers.forEach(printElement)
// 2. Asynchronous Programming
// 3. Event-Driven Programming
// 4. Object-Based Programming
// 5. Object-Oriented Programming

// Node.js: JS Engine (v8), Single Execution Thread -> Event Queue: Event Loop
