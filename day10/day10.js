const fs = require('fs')
const { slice } = require('lodash')
let data = fs.readFileSync('./day10/input.txt').toString().split('\r\n')
data.forEach((d, index) => {
    data[index] = parseInt(d)
})
data = data.sort((a, b) => a - b)


const maxOutput = (adapters) => {
    return Math.max(...adapters)
}

const getDifferences = (adapters) => {
    let difference = {
        one: 0,
        three: 0
    }

    if (adapters[0] === 1) difference.one++
    if (adapters[0] === 3) difference.three++

    adapters.forEach((a, index) => {
        switch (a) {
            case adapters[index + 1] - 1:
                difference.one++
                break
            case adapters[index + 1] - 3:
                difference.three++
                break
        }
    })
    difference.three++

    return difference
}

const multiplyDifferences = (adapters) => {
    const differences = getDifferences(adapters)
    return differences.one * differences.three
}

//RECURSION WORKS (FOR SMALLER SETS) BUT REALLY SLOW
//DIDNT TEST FOR BIG SET
const possibleChainsRECURSION = (adapters, currentOutput = 0, dept = 0) => {
    let count = 0
    if (currentOutput === maxOutput(adapters)) {
        console.log(dept)
        return 1
    }
    else {
        let slicedAdapters = adapters.slice(adapters.indexOf(currentOutput) + 1, adapters.indexOf(currentOutput) + 4)

        if (slicedAdapters.includes(currentOutput + 1)) {
            count += possibleChains(adapters, currentOutput + 1, dept++)
        }
        if (slicedAdapters.includes(currentOutput + 2)) {
            count += possibleChains(adapters, currentOutput + 2, dept++)

        }
        if (slicedAdapters.includes(currentOutput + 3)) {
            count += possibleChains(adapters, currentOutput + 3, dept++)
        }
        return count
    }
}

//FORLOOP WORKS FOR BIG SET, FAST
const possibleChains = (adapters) => {
    adapters.unshift(0)
    adapters.push(maxOutput(adapters) + 3)

    const steps = {
        0: 1
    }

    for (let i = 0; i < adapters.length; i++) {
        let j = i + 1
        while (adapters[j] <= adapters[i] + 3) {
            steps[j] = (steps[j] || 0) + steps[i]
            j++
        }
    }
    return steps[adapters.length-1]
}


console.log('task1: ', multiplyDifferences(data))
console.log('task2: ', possibleChains(data))

