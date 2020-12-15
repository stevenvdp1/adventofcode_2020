const fs = require('fs')
const _ = require('lodash')
const data = fs.readFileSync('./day8/input.txt').toString().split('\r\n')

data.forEach((e, index) => {
    let splitLine = e.split(' ')

    data[index] = {
        com: splitLine[0],
        val: parseInt(splitLine[1]),
        vis: false
    }
})

const executeCommand = (commands, accvalue, index) => {
    if (index === commands.length) return [true, accvalue]
    if (index > commands.length || commands.length < 0) return [false, accvalue]
    if (commands[index].vis) return [false, accvalue]
    commands[index].vis = true
    switch (commands[index].com) {
        case 'nop':
            index++
            return executeCommand(commands, accvalue, index)
        case 'acc':
            accvalue += commands[index].val
            index++
            return executeCommand(commands, accvalue, index)
        case 'jmp':
            index += commands[index].val
            return executeCommand(commands, accvalue, index)
        default:
            console.log('default')
    }
}

const changeCommands = (commands) => {
    for (let i = 0; i < commands.length; i++) {
        let changedCommands = _.cloneDeep(commands)
        switch (changedCommands[i].com) {
            case 'nop':
                changedCommands[i].com = 'jmp'
                break
            case 'jmp':
                changedCommands[i].com = 'nop'
                break
        }
        let executeResult = executeCommand(changedCommands, 0, 0)
        if (executeResult[0]) return executeResult
    }
}

console.log('task1: ', executeCommand(_.cloneDeep(data), 0, 0)[1])
console.log('task2: ', changeCommands(_.cloneDeep(data))[1])