const fs = require('fs')
const _ = require('lodash')
const data = fs.readFileSync('./day12/input.txt').toString().split('\r\n')

class Ship {

    x = 0
    y = 0
    facingDirection = 0

    move = (action, value) => {
        switch (action) {
            case 'N':
                this.y += value
                break
            case 'S':
                this.y -= value
                break
            case 'E':
                this.x += value
                break
            case 'W':
                this.x -= value
                break
            case 'L':
                this.facingDirection = (this.facingDirection - value) % 360
                break
            case 'R':
                this.facingDirection = (this.facingDirection + value) % 360
                break
            case 'F':
                switch (this.facingDirection) {
                    case 0:
                        this.move('E', value)
                        break
                    case 90:
                    case -270:
                        this.move('S', value)
                        break
                    case 180:
                    case -180:
                        this.move('W', value)
                        break
                    case 270:
                    case -90:
                        this.move('N', value)
                        break
                }
                break
        }
    }

    manhattanDistance = () => {
        return Math.abs(this.x) + Math.abs(this.y)
    }
}

class Ship2 {

    x = 0
    y = 0

    wayPointX = 10
    wayPointY = 1
    

    move = (action, value) => {
        let wpx = this.wayPointX
        let wpy = this.wayPointY
        switch (action) {
            case 'N':
                this.wayPointY += value
                break
            case 'S':
                this.wayPointY -= value
                break
            case 'E':
                this.wayPointX += value
                break
            case 'W':
                this.wayPointX -= value
                break
            case 'L':
                switch (value) {
                    case 90:
                        this.wayPointX = -wpy
                        this.wayPointY = wpx
                        break
                    case 180:
                        this.wayPointX = -this.wayPointX
                        this.wayPointY = -this.wayPointY  
                        break
                    case 270:
                        this.wayPointX = wpy
                        this.wayPointY = -wpx
                        break
                }
                break
            case 'R':
                switch (value) {
                    case 90:
                        this.wayPointX = wpy
                        this.wayPointY = -wpx
                        break
                    case 180:
                        this.wayPointX = -this.wayPointX
                        this.wayPointY = -this.wayPointY  
                        break
                    case 270:
                        this.wayPointX = -wpy
                        this.wayPointY = wpx
                        break
                }
                break
            case 'F':
                this.x += this.wayPointX*value
                this.y += this.wayPointY*value
                break
        }
    }

    manhattanDistance = () => {
        return Math.abs(this.x) + Math.abs(this.y)
    }
}


const ship = new Ship()
const ship2 = new Ship2()
data.forEach(d=>{
    ship.move(d[0], parseInt(d.slice(1)))
    ship2.move(d[0], parseInt(d.slice(1)))
})

console.log('task1: ',ship.manhattanDistance())
console.log('task2: ',ship2.manhattanDistance())
