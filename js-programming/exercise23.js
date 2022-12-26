function fun() { // non-blocking, asynchronous function
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (Math.random() < 0.5) {
                reject("Something is wrong!"); // throw
            }
            resolve(42); // return
        }, 5_000);
    })
}

console.log("Application is just started.")
fun().then( result => console.log(`result=${result}`))
     .catch( err => console.error(err));
console.log("Application is completed.")
