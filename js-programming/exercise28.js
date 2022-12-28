let fruits = ["elma", "armut", "kiraz", "karpuz", "muz", "seftali", "kavun"]
for (const fruit of fruits) {
    if (fruit.match("^k[a-z]*z$")) {
        console.log(fruit);
    }
}
for (const fruit of fruits) {
    if (fruit.match("^[a-z]{6,}$")) {
        console.log(fruit);
    }
}