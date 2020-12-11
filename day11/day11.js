const fs = require('fs')
const _ = require('lodash')
const data = fs.readFileSync('./day11/input.txt').toString().split('\r\n')
data.forEach((line, index) => {
    data[index] = line.split('')
})

const adjacentOccupiedSeats = (map, y, x) => {
    let count = 0
    if (map[y + 1]) {
        if (map[y + 1][x] === '#') count++
        if (map[y + 1][x + 1] === '#') count++
        if (map[y + 1][x - 1] === '#') count++
    }
    if (map[y - 1]) {
        if (map[y - 1][x] === '#') count++
        if (map[y - 1][x + 1] === '#') count++
        if (map[y - 1][x - 1] === '#') count++
    }
    if (map[y][x - 1] === '#') count++
    if (map[y][x + 1] === '#') count++

    return count
}

const adjacentOccupiedSeats2 = (map, y, x) => {
    let count = 0

    if (isSeatOccupied(firstSeat(map, y, x, -1, -1))) count++
    if (isSeatOccupied(firstSeat(map, y, x, -1, 0))) count++
    if (isSeatOccupied(firstSeat(map, y, x, -1, 1))) count++
    if (isSeatOccupied(firstSeat(map, y, x, 0, -1))) count++
    if (isSeatOccupied(firstSeat(map, y, x, 0, 1))) count++
    if (isSeatOccupied(firstSeat(map, y, x, 1, -1))) count++
    if (isSeatOccupied(firstSeat(map, y, x, 1, 0))) count++
    if (isSeatOccupied(firstSeat(map, y, x, 1, 1))) count++

    return count
}

const firstSeat = (map, y, x, yDir, xDir) => {
    let seat = ''
    let i = 1
    while (i>0) {
        if (map[y + i * yDir]) {
            seat = map[y + i * yDir][x + i * xDir] || ''
            if (isSeat(seat)) i=0
            else i++
        }
        else {
            seat = ''
            i=0
        }
    }

    return seat
}

const isSeat = (seat) => {
    return ['', 'L', '#'].includes(seat) ? true : false
}

const isSeatOccupied = (seat) => {
    return seat === '#' ? true : false
}

const seatPeople = (map, tollerance, countOccupiedSeats) => {
    let updatedMap = _.cloneDeep(map)

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            switch (map[y][x]) {
                case 'L':
                    if (countOccupiedSeats(map, y, x) === 0) {
                        updatedMap[y][x] = '#'
                    }
                    break
                case '#':
                    if (countOccupiedSeats(map, y, x) >= tollerance) {
                        updatedMap[y][x] = 'L'
                    }
                    break
                case '.':
                    break
            }
        }
    }

    if (_.isEqual(map, updatedMap)) {
        return updatedMap
    }
    else {
        return seatPeople(updatedMap, tollerance, countOccupiedSeats)
    }
}

const totalOccupiedSeats = (map) => {
    let count = 0
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (map[x][y] === '#') count++
        }
    }
    return count
}

console.log('task1: ', totalOccupiedSeats(seatPeople(data, 4, adjacentOccupiedSeats)))
console.log('task2: ', totalOccupiedSeats(seatPeople(data, 5, adjacentOccupiedSeats2)))

