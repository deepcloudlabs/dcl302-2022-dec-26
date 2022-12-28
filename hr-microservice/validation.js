function ibanValidator(value) {
    return true;
}

function tcKimlikNoValidator(value) {
    if (value.match("^\\d{11}$") == null) {
        return false;
    }
    const digits = new Array(11);
    for (let i = 0; i < digits.length; ++i) {
        digits[i] = value.charCodeAt(i) - 48;
        if (digits[i] < 0 || digits[i] > 9) {
            return false;
        }
    }
    let x = digits[0];
    let y = digits[1];
    for (let i = 1; i < 5; i++) {
        x += Number(digits[2 * i]);
    }
    for (let i = 2; i <= 4; i++) {
        y += Number(digits[2 * i - 1]);
    }
    const c1 = 7 * x - y;
    if (c1 % 10 !== digits[9]) {
        return false;
    }
    let c2 = 0;
    for (let i = 0; i < 10; ++i) {
        c2 += digits[i];
    }
    return c2 % 10 === digits[10];

}

exports.tcKimlikNoValidator = tcKimlikNoValidator;
exports.ibanValidator = ibanValidator;