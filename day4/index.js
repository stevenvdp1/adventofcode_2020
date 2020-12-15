const fs = require('fs')
const { parse } = require('path')
const { ppid } = require('process')
const data = fs.readFileSync('./day4/input.txt').toString().split('\r\n\r\n')
data.forEach((e, index) => {

    passportObject = {}
    let entry = e.replace(/\r\n/g, ' ').split(' ')
    entry.forEach(field => {
        field = field.split(':')
        passportObject[field[0]] = field[1]
    })
    data[index] = passportObject
})

const validPassports1 = (passports) => {
    let validPassports = []
    passports.forEach(p => {
        if (
            p.byr &&
            p.iyr &&
            p.eyr &&
            p.hgt &&
            p.hcl &&
            p.ecl &&
            p.pid
        ) {
            validPassports.push(p)
        }
    });
    return validPassports
}

const validPassports2 = (passports) => {

    let validPassports = []

    passports.forEach(p => {
        let valid = true
        const { byr, iyr, eyr, hgt, hcl, ecl, pid, cid } = p

        //LENGTH
        if (valid && !(byr && byr.length === 4 && parseInt(byr) >= 1920 && parseInt(byr) <= 2002)) {
            valid = false
        }

        //ISSUE YEAR
        if (valid && !(iyr && iyr.length === 4 && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020)) {
            valid = false
        }

        //EXPIRATION YEAR
        if (valid && !(eyr && eyr.length === 4 && parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030)) {
            valid = false
        }

        //HEIGHT
        if (valid && hgt) {
            const value = parseInt(hgt.slice(0, hgt.length - 2))
            const unit = hgt.slice(-2)
            if (!['cm', 'in'].includes(unit)) {
                valid = false
            }
            else if (unit === 'cm' && !(value >= 150 && value <= 193)) {
                valid = false
            }
            else if (unit === 'in' && !(value >= 59 && value <= 76)) {
                valid = false
            }
        }
        else {
            valid = false
        }

        //HAIRCOLOR
        const validCharsHcl = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
        if (valid && hcl && hcl.length === 7 && hcl[0] === '#') {
            for (let i = 1; i < hcl.length; i++) {
                if (!validCharsHcl.includes(hcl[i])) {
                    valid = false
                }
            }
        }
        else {
            valid = false
        }

        //EYECOLOR
        const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
        if (valid && !(ecl && eyeColors.includes(ecl))) {
            valid = false
        }

        //PASSPORT ID
        const validCharsPid = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

        if (valid && pid && pid.length === 9) {
            for (let i = 0; i < pid.length; i++) {
                if (!validCharsPid.includes(pid[i])) {
                    valid = false
                }
            }
        }
        else {
            valid = false
        }

        if (valid) {
            validPassports.push(p)
        }

    })

    return validPassports
}


console.log('part1: ', validPassports1(data).length)
console.log('part2: ', validPassports2(data).length)
