const fs = require('fs')
const dataArray = fs.readFileSync('./day7/input.txt').toString().split('\r\n')
const dataObject = {}
dataArray.forEach((d) => {
    let key = d.replace('.', '').replace(/bags/g, '').replace(/bag/g, '').split('contain')[0].trim()
    dataObject[key] = {}
    let values = d.replace('.', '').replace(/bags/g, '').replace(/bag/g, '').split('contain')[1].split(',')
    values.forEach(v => {
        if (v.trim() !== 'no other') {
            let bag = v.trim().replace(' ', ':').split(':')
            dataObject[key][bag[1]] = parseInt(bag[0])
        }
    })
})

const canBagContainMyBag = (bag, myBag) => {
    if (Object.keys(bag).length === 0) return false

    let canContain = false
    for (const [key, value] of Object.entries(bag)) {
        if (key === myBag) canContain = true
        else canContain = canBagContainMyBag(dataObject[key], myBag)
        if (canContain) return canContain
    }
    return canContain
}

const possibleBags = (myBag) => {
    let posibleBags = 0
    Object.values(dataObject).forEach(value => canBagContainMyBag(value, myBag) && posibleBags++)
    return posibleBags
}

const bagsInsideMyBag = (myBag) => {
    let count = 0
    Object.entries(dataObject[myBag]).forEach(([key, value]) => count += value + value * bagsInsideMyBag(key))
    return count
}

console.log('task1: ', possibleBags('shiny gold'))
console.log('task2: ', bagsInsideMyBag('shiny gold'))
