let numbers = [4, 8, 15, 16, 23, 42];// array
function numerical_order_asc(u, v) {
    if (u < v) return -1;
    if (u === v) return 0;
    if (v < u) return +1;
}

function simplified_numerical_order_asc(u, v) {
    return u - v;
}

function simplified_numerical_order_desc(u, v) {
    return v - u;
}

numbers.sort(simplified_numerical_order_desc);

console.log(numbers);