let fruits = [
    "Banana", "Apple", "Mango", "Orange", "Lemon", "Guava"
]

let meyveler = [...fruits]; // cloning
meyveler.push("pear")
fruits.push("strawberry")
console.log(fruits)
console.log(meyveler)
