const fs = require('fs')
const data = fs.readFileSync('./day5/input.txt').toString().split('\r\n')

const decodeBoardingPass = (boardingPass) => {
    let rangeRows = [0, 127]
    let rangeCols = [0, 7]

    for (let i = 0; i < boardingPass.length; i++) {
        switch (boardingPass[i]) {
            case 'B':
                rangeRows[0] += Math.ceil((rangeRows[1] - rangeRows[0]) / 2)
                break
            case 'F':
                rangeRows[1] -= Math.ceil((rangeRows[1] - rangeRows[0]) / 2)
                break
            case 'L':
                rangeCols[1] -= Math.ceil((rangeCols[1] - rangeCols[0]) / 2)
                break
            case 'R':
                rangeCols[0] += Math.ceil((rangeCols[1] - rangeCols[0]) / 2)
                break
            default:
                break
        }
    }

    if(rangeRows[0] === rangeRows[1] && rangeCols[0]===rangeCols[1]){
        let seatID = (rangeRows[0]*8) + rangeCols[0] 
        return [rangeRows[0], rangeCols[0], seatID]
    }
    else{
        console.log('ERROR')
    }
}

const highestSeatId = (boardingPasses) =>{
    let id = 0
    boardingPasses.forEach(b=>{
        let decoded = decodeBoardingPass(b)
        if(decoded[2]>id) id=decoded[2]
    })
    return id
}

const seatIds = (boardingPasses) =>{
    let ids = []
    boardingPasses.forEach(b=>{
        ids.push(decodeBoardingPass(b)[2])
    })
    ids.sort((a,b)=>a-b)
    return(ids)
}

const findSeat = (boardingPasses) =>{
    let ids = seatIds(boardingPasses)
    
    let seatId = null
    let lowestSeatNumber = ids[0]
    let currentSeatIndex = 0
    let currentSeatId
    while(!seatId){
        currentSeatId = currentSeatIndex + lowestSeatNumber
        if(ids[currentSeatIndex] !== currentSeatId){
            if(ids[currentSeatIndex]===currentSeatId+1 && ids[currentSeatIndex-1]===currentSeatId-1){
                seatId = currentSeatId
            }
        }
        currentSeatIndex++
    }
    return(seatId)    
}


console.log('task1: ', highestSeatId(data))
console.log('task2: ', findSeat(data))