function gun(x = 3, y = 5, z = 7) {
    for (let argument of arguments)
        console.log(argument)
    /*    x = x || 3;
        y = y || 5;
        z = z || 7;*/
    console.log(`x: ${x},y: ${y},z: ${z}`)
    return x * y + z;
}

const fun = function (x, y, z) {
    if (arguments.length !== 3)
        throw "You must provide exactly 3-params.";
    for (let [argument,i] of arguments)
        console.log(argument+","+i)
    return x * y + z;
}

console.log(`gun(): ${gun()}`);
console.log(`gun(3): ${gun(3)}`);
console.log(`gun(3,4): ${gun(3, 4)}`);
console.log(`gun(3,4,5): ${gun(3, 4, 5)}`);
//console.log(`fun(): ${fun()}`);
//console.log(`fun(3): ${fun(3)}`);
//console.log(`fun(3,4): ${fun(3,4)}`);
//console.log(`fun(3,4,5,6): ${fun(3, 4, 5, 6)}`);
//console.log(`fun(3,4,5,6,7): ${fun(3, 4, 5, 6, 7)}`);
