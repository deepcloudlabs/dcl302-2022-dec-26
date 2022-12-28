function fun() {
    for (var i = 0; i < 10; ++i)
        console.log(`Inside the for loop: i=${i}`);
    console.log(`After the for loop: i=${i}`);
    const one = 1;
    for (let j = 0; j < 10; j += one) {
        // one++;
        console.log(`Inside the for loop: j=${j}`);
    }
    // console.log(`After the for loop: j=${j}`);
}

fun();