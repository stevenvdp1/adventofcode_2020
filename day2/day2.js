const fs = require('fs')
const data = fs.readFileSync('./day2/input.txt').toString().split('\r\n')
data.forEach((e, index) => {
    data[index] = e.replace(':', '').replace('-', ' ').split(' ')
})


const correctPasswordsPolicy1 = (passwords) => {
    let correct = []
    passwords.forEach(password => {
        const [min, max, letter, pw] = password
        const count = pw.split(letter).length - 1

        if (min <= count && count <= max) correct.push(pw)

    })
    return correct
}

const correctPasswordsPolicy2 = (passwords) => {
    let correct = []
    passwords.forEach(password => {
        const [pos1, pos2, letter, pw] = password
        if (pw[pos1 - 1] === letter) {
            if (pw[pos2 - 1] !== letter) {
                correct.push(pw)
            }
        }
        else if (pw[pos2 - 1] === letter) {
            correct.push(pw)
        }
    })
    return correct
}

console.log('part1: ', correctPasswordsPolicy1(data).length)
console.log('part2: ', correctPasswordsPolicy2(data).length)
