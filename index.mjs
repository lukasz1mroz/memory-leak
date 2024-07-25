import fs from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

const asyncArray = () => 
    new Promise(resolve => {
        const a = new Array (10000000)
        const b = a.fill(0).map((_, idx) => idx + Math.random())

        setTimeout(1).then(() => resolve(b))
    })

const recursiveFunc = async (left, onData) => {
    const data = await asyncArray()

    await onData(data)

    if (left > 0) {
        // Unreturned promise, careful with returns and references
        // return recursion(left - 1, onData)
        await recursiveFunc(left - 1, onData)
    }
}

const onDataCallback = async data => {
    new Promise(resolve => {
        console.log(data.length)
        resolve()
    })
}

const main = async () => {
    while(true) {
        await recursiveFunc(100, onDataCallback)
        await setTimeout(100)
    }
}

main().then(console.info).catch(console.error)