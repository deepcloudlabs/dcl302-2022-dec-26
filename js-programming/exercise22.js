function fun() { // blocking, synchronous function
    let count = 0;
    for (let j = 0; j < 10_000; ++j)
        for (let i = 0; i < 1_000_000_000; ++i)
            count++;
    return 42;
}

console.log("Application is just started.")
let result = fun();
console.log(`result=${result}`)
console.log("Application is completed.")
