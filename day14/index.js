const fs = require('fs')

const data = fs.readFileSync('./day14/input.txt').toString().split('\r\n')

class Decoder {
    bitmask
    memory = {}

    setMask = (mask) => {
        this.mask = mask
    }

    intToBin = (value) => {
        let result = value.toString(2)
        while (result.length < 36) {
            result = '0' + result
        }
        return result
    }



    runLine = (line) => {
        line = this.parseLine(line)
        switch (line[0]) {
            case 'mask':
                this.setMask(line[1])
                break
            case 'mem':
                this.writeToMem(parseInt(line[1]), parseInt(line[2]))
                break
        }
    }

    parseLine = (line) => line.replace(/ |\]/g, '').replace(/\[|\=/g, ' ').split(' ')

    sumOfValues = () => {
        return Object.values(this.memory).reduce((a, b) => a + b, 0)
    }
}

class Version1 extends Decoder {
    writeToMem = (address, value) => {
        let binaryValue = this.intToBin(value)
        let result = ''

        for (let i = 0; i < binaryValue.length; i++) {
            if (['0', '1'].includes(this.mask[i])) { result += this.mask[i] }
            else { result += binaryValue[i] }
        }

        this.memory[address] = parseInt(result, 2)
    }
}

class Version2 extends Decoder {
    writeToMem = (address, value) => {
        let binaryAddress = this.intToBin(address)
        let binaryAddressResult = ''

        for (let i = 0; i < binaryAddress.length; i++) {
            switch (this.mask[i]) {
                case 'X':
                    binaryAddressResult += 'X'
                    break
                case '0':
                    binaryAddressResult += binaryAddress[i]
                    break
                case '1':
                    binaryAddressResult += '1'
                    break
            }
        }

        let addressVariations = this.getVariations(binaryAddressResult)
        
        addressVariations.forEach(variation => {
            this.memory[parseInt(variation,2)] = value
        })
    }


    getVariations = (binaryAddress) =>{
        let addresses = []

        for(let i = 0; i<binaryAddress.length;i++){
            if(binaryAddress[i] ==='X'){
                let variation0 = binaryAddress.split('')
                variation0[i] = 0
                variation0 = variation0.join('')

                let variation1 = binaryAddress.split('')
                variation1[i] = 1
                variation1 = variation1.join('')

                addresses.push(...this.getVariations(variation0))
                addresses.push(...this.getVariations(variation1))
                break
            }
        }
        if(addresses.length === 0) addresses.push(binaryAddress)


        return addresses
    }

    
}

let decoder1 = new Version1()
let decoder2 = new Version2()
data.forEach(line => {
    decoder1.runLine(line)
    decoder2.runLine(line)
})
console.log('task1: ', decoder1.sumOfValues())
console.log('task2: ', decoder2.sumOfValues())
