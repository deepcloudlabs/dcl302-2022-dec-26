async function fun() { // non-blocking, asynchronous function
    if (Math.random() < 0.5) {
        throw "Something is wrong!";
    }
    return 42;
}

console.log("Application is just started.")
fun().then(result => console.log(`result=${result}`))
    .catch(err => console.error(err));
console.log("Application is completed.")
