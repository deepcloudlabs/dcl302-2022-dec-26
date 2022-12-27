function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw(max, size) {
    const numbers = [];
    while (numbers.length < size) {
        const number = getRandomNumber(1, max);
        if (numbers.includes(number)) continue;
        numbers.push(number);
    }
    numbers.sort((x, y) => x - y);
    return numbers;
}


function drawMultiple(max, size, column) {
    const numbers = [];
    for (let i = 0; i < column; ++i)
        numbers.push(draw(max, size));
    return numbers;
}

exports.drawMultiple = drawMultiple
