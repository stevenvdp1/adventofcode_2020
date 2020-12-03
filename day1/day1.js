const fs = require('fs')
const data = fs.readFileSync('./day1/input.txt').toString().split('\r\n')
data.forEach((e, index) => {
    data[index] = parseInt(e)
})



const getNumberPair = (numbers, totalSum) => {
    let pair = []
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === totalSum) pair = [numbers[i], numbers[j]]
        }
    }
    return pair
}

const getNumberTriple = (numbers, totalSum) => {
    let triple = []
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] < totalSum) {
                for (let k = j + 1; k < numbers.length; k++) {
                    if (numbers[i] + numbers[j] + numbers[k] === totalSum) triple = [numbers[i], numbers[j], numbers[k]]
                }
            }
        }
    }
    return triple
}


const numberPair = getNumberPair(data, 2020)
console.log('part1: ', numberPair[0] * numberPair[1])

const numberTriple = getNumberTriple(data, 2020)
console.log('part2: ', numberTriple[0] * numberTriple[1] * numberTriple[2])

