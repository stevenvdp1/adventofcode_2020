const fs = require('fs')

const data = fs.readFileSync('./day16/input.txt').toString().split('\r\n')

let lineIndex = 0
let rules = {}
while (true) {

    if (data[lineIndex] === '') {
        lineIndex += 2
        break
    }

    let line = data[lineIndex].replace(/\: | or /g, ',').split(',')
    let ruleTitle = line[0]
    let rule1 = line[1].split('-')
    let rule2 = line[2].split('-')
    rules[ruleTitle] = [rule1, rule2]
    lineIndex++
}

let myTicket = data[lineIndex].split(',')
lineIndex += 3

let nearbyTickets = []
while (lineIndex < data.length) {
    nearbyTickets.push(data[lineIndex].split(','))
    lineIndex++
}

const invalidTicketValues = (ticket) => {
    let unpackedRules = Object.values(rules).flat(1)
    let invalidValues = []
    ticket.forEach(value => {
        let valid = false
        unpackedRules.some(rule => {
            if (parseInt(rule[0]) <= parseInt(value) && parseInt(rule[1]) >= parseInt(value)) {
                valid = true
                return valid
            }
        })
        if (!valid) {
            invalidValues.push(parseInt(value))
        }
    });
    return invalidValues
}

const getInvalidValueSum = (tickets) => {
    let sum = 0
    tickets.forEach(ticket => {
        sum += invalidTicketValues(ticket).reduce((a, b) => a + b, 0)
    })

    return sum
}

const validTickets = (tickets) => {
    let validTickets = []
    let unpackedRules = Object.values(rules).flat(1)
    tickets.forEach(ticket => {
        let isValidTicket = ticket.every(value => {
            let valid = false
            unpackedRules.some(rule => {
                if (parseInt(rule[0]) <= parseInt(value) && parseInt(rule[1]) >= parseInt(value)) {
                    valid = true
                    return valid
                }
            })
            return valid
        })

        if (isValidTicket) {
            validTickets.push(ticket)
        }
    })
    return validTickets
}

const ticketFieldOrder = (myTicket, tickets) => {
    tickets = validTickets(tickets)
    let result = []
    for (let i = 0; i < myTicket.length; i++) {
        result[i] = []
        Object.entries(rules).forEach(([key, values]) => {
            if (isRuleValid(myTicket[i], values)) {
                if (tickets.every(ticket => isRuleValid(ticket[i], values))) {
                    result[i].push(key)
                }
            }
        })
    }

    while (result.some(res => res.length > 1)) {
        for (let i = 0; i < result.length; i++) {
            if (result[i].length == 1) {
                for (let j = 0; j < result.length; j++) {
                    if (i !== j) {
                        result[j] = result[j].filter(x => x !== result[i][0])
                    }
                }
            }
        }
    }
    return result.flat(1)
}

const isRuleValid = (value, rules) => {
    return rules.some(rule => parseInt(value) >= parseInt(rule[0]) && parseInt(value) <= parseInt(rule[1]))
}

const productDepartureFields = (myticket, fieldOrder) => {
    let product = 1
    fieldOrder.forEach((field, index) => {
        if (field.includes('departure')) {
            product *= parseInt(myTicket[index])
        }
    })
    return product
}



console.log('task1: ', getInvalidValueSum(nearbyTickets))

console.log('taks2: ', productDepartureFields(myTicket, ticketFieldOrder(myTicket, nearbyTickets)))