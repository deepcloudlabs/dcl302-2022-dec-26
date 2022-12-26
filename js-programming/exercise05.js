const math = require("mathjs")

console.log(math.round(math.e, 3));
console.log(math.atan2(3, -3) / math.pi);
console.log(math.log(10000, 10));                  // 4
console.log(math.sqrt(-4));                        // 2i
console.log(math.derivative('x^2 + x', 'x'));      // 2*x+1
console.log(math.pow([[-1, 2], [3, 1]], 2));

// expressions
console.log(math.evaluate('1.2 * (2 + 4.5)'));    // 7.8
console.log(math.evaluate('12.7 cm to inch'));     // 5 inch
console.log(math.evaluate('sin(45 deg) ^ 2'));     // 0.5
console.log(math.evaluate('9 / 3 + 2i'));          // 3 + 2i
console.log(math.evaluate('det([-1, 2; 3, 1])'));  // -7