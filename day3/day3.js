const fs = require('fs')
const data = fs.readFileSync('./day3/input.txt').toString().split('\r\n')

const getTreesOnSlope = (map, right, down) => {
    let xPos = 0
    let yPos = 0

    let trees = 0

    while (yPos < map.length-1) {
        xPos += right
        yPos += down
        xPos %= (map[yPos].length)
        if(map[yPos][xPos]==='#') trees++
    }
    return trees
}

console.log('Part1:', getTreesOnSlope(data, 3, 1))

console.log('Part2:',getTreesOnSlope(data, 1, 1)*getTreesOnSlope(data, 3, 1)*getTreesOnSlope(data, 5, 1)*getTreesOnSlope(data, 7, 1)*getTreesOnSlope(data, 1, 2))