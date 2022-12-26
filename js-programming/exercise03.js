let x;
x = 1 / 0;
console.log(`x=${x}`);

x = -1 / 0;
console.log(`x=${x}`);

x = 0 / 0;
console.log(`x=${x}`);
x++;
console.log(`x=${x}`);
x = 0 * x;
console.log(`x=${x}`);
console.log(Number.isNaN(x));
console.log(Number.isFinite(1/0));
console.log(Number.isInteger(3.1415));