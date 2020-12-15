const fs = require('fs')
const { last } = require('lodash')

let data = fs.readFileSync('./day15/input.txt').toString().split(',')
let numbers = new Map()
data.forEach((num, index) => {
    numbers.set(parseInt(num), index+1)
})

let turn = data.length
let lastTurnNumber = parseInt(data[turn-1])

function playTurn() {
    let thisTurnNumber = 0

    if(numbers.has(lastTurnNumber)){
        thisTurnNumber = turn - numbers.get(lastTurnNumber)
    }
    numbers.set(lastTurnNumber, turn)
    lastTurnNumber = thisTurnNumber

    turn++
}

while (turn < 2020) {
    playTurn()
}
console.log('2020th number: ', lastTurnNumber)
while (turn < 30000000) {
    playTurn()
}
console.log('30000000th number:', lastTurnNumber)

