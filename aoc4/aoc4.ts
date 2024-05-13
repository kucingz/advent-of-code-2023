import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('aoc4/input.txt'));

//part1
let part1Result = 0;
let part1LineResult = 0;

//part2
let part2Result = 0;
let part2CountArray = [];
let lines: string[] = [];

const part1 = (winningNumbers: string[], myNumbers: string[]) => {
    for (let i = 0; i < winningNumbers.length; i++) {
        if (myNumbers.find((x) => x === winningNumbers[i])) {
            if (part1LineResult === 0) part1LineResult = 1;
            else part1LineResult = part1LineResult * 2;
        }
    }

    part1Result = part1LineResult + part1Result;
    part1LineResult = 0;
};
// const part2 = (winningNumbers: string[], myNumbers: string[]) => {
//     for (let i = 0; i < winningNumbers.length; i++) {
//         if (myNumbers.find((x) => x === winningNumbers[i])) {
//             part2LineResult++;
//         }
//     }
//     for (let x = 0; x < lines.length; x++) {
//         for (let y = 0; y < 0; y++) {}
//     }
// };

reader.on('line', (l: string) => {
    const winningNumbers = l
        .split(':')[1]
        .split(' | ')[0]
        .split(' ')
        .filter((elm) => elm);
    const myNumbers = l
        .split(':')[1]
        .split(' | ')[1]
        .split(' ')
        .filter((elm) => elm);
    part1(winningNumbers, myNumbers);
    lines.push(l);
});
reader.on('close', () => {
    let tmpCount = 0;
    for (let i = 0; i < lines.length; i++) {
        part2CountArray[i] = 1;
    }

    for (let x = 0; x < lines.length; x++) {
        const winningNumbers = lines[x]
            .split(':')[1]
            .split(' | ')[0]
            .split(' ')
            .filter((elm) => elm);
        const myNumbers = lines[x]
            .split(':')[1]
            .split(' | ')[1]
            .split(' ')
            .filter((elm) => elm);
        for (let y = 0; y < winningNumbers.length; y++) {
            if (myNumbers.find((x) => x === winningNumbers[y])) {
                tmpCount++;
            }
        }

        for (let j = 1; j <= tmpCount; j++) {
            for (let o = 0; o < part2CountArray[x]; o++) {
                part2CountArray[j + x]++;
            }
        }
        tmpCount = 0;
    }

    part2CountArray.forEach((el) => (part2Result += el));
    console.log(part1Result, part2Result);
});
