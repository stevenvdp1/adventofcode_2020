const fs = require('fs')
const data = fs.readFileSync('./day6/input.txt').toString().split('\r\n\r\n')
data.forEach((d, index) => {
    data[index] = d.replace(/\r\n/g, ' ')
})

const oneYesAnswers = (form) => {
    return new Set(form.replace(/ /g, '')).size
}

const allYesAnswers = (form) => {
    let allYesAnswers = 0
    let formPerPerson = form.split(' ')
    const questions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    questions.forEach(q=>{
        formPerPerson.every(form=>form.includes(q))&&allYesAnswers++
    })
    return allYesAnswers
}


const sumAnswers = (declerationForms, analyzeForm) => {
    let sum = 0
    declerationForms.forEach(form => sum += analyzeForm(form))
    return sum
}

console.log('task1: ', sumAnswers(data, oneYesAnswers))
console.log('task2: ', sumAnswers(data, allYesAnswers))