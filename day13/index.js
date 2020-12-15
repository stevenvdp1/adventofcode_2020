const fs = require('fs')
const _ = require('lodash')
const data = fs.readFileSync('./day13/input.txt').toString().split('\r\n')

const arrivingTime = data[0]
const busIds = data[1].split(',').map(id => parseInt(id))

const findBus = (arrivingTime, busIds) => {
    let nextBusTimes = []
    busIds.forEach(id => {
        if (Number.isInteger(id)) {
            nextBusTimes.push({ id: id, nextBusTime: nextBusTime(arrivingTime, id) })
        }
    });
    return nextBusTimes.reduce((prev, curr) => prev.nextBusTime < curr.nextBusTime ? prev : curr)
}

const nextBusTime = (arrivingTime, busId) => {
    return Math.ceil(arrivingTime / busId) * busId
}

//DOENST WORK FOR BIG NUMBERS
//BRUTE FORCE
const findPattern = (busIds, timeStamp = 0, index = 0) => {

    let _xChainLength = xChainLength(busIds, index)
    let _nextBusTime = nextBusTime(timeStamp, busIds[index + 1 + _xChainLength])

    let pattern = [timeStamp]

    if (timeStamp + _xChainLength + 1 === _nextBusTime) {
        if(index+1+_xChainLength<busIds.length-1){
            let nextPattern = findPattern(busIds, _nextBusTime, index + 1 + _xChainLength)
            if(nextPattern){
                pattern.push(...nextPattern)
            }
            else{
                return false
            }
        }
        else{
            pattern.push(_nextBusTime)
        }
        return pattern
    }
    return false
}

//DOES WORK
const findStartTimePattern = (busIds) =>{
    let busses = new Map()

    busIds.forEach((id, index)=>{
        if(Number.isInteger(id)){
            busses.set(index, id)
        }
    })

    let time = 0
    let step = 1

    for([offset, id] of busses.entries()){
        while((time+offset)%id){
            time+=step
        }
        step *= id
    }
    return time
}

let bus = findBus(arrivingTime, busIds)
console.log('task1: ',(bus.nextBusTime-arrivingTime)*bus.id)
console.log('task2: ',findStartTimePattern(busIds))
