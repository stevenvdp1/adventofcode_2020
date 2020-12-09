const fs = require('fs')
const data = fs.readFileSync('./day9/input.txt').toString().split('\r\n')
data.forEach((d, index) => {
    data[index] = parseInt(d)
})


const findInvalidNumber = (data, preambleLength, index) => {
    let preamble = data.slice(index, preambleLength + index)
    if (preamble.some(number => preamble.some(complement => complement !== number && complement + number === data[preambleLength + index]))) {
        return findInvalidNumber(data, preambleLength, index + 1)
    }
    else {
        return data[preambleLength + index]
    }
}

const encryptionWeakness = (data, invalidNumber) => {
    let numArray = []
    let start = 0
    let index = 0

    while(numArray.reduce((a,b)=>a+b,0)!==invalidNumber){
        numArray.push(data[start+index])
        index++
        if(numArray.reduce((a,b)=>a+b,0)>invalidNumber){
            index=0
            numArray=[]
            start++
        }
    }
    return Math.min(...numArray)+Math.max(...numArray)
}

console.log('task1: ', findInvalidNumber(data, 25, 0))
console.log('task2: ', encryptionWeakness(data, findInvalidNumber(data, 25, 0)))