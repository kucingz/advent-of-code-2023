import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('aoc2/input.txt'));

let part1Result = 0;
let part2Result = 0;
let validSetsCount = 0;
let greenMax = 0;
let blueMax = 0;
let redMax = 0;

const part1 = (colors: string[]) => {
    let validColorsCount = 0;
    colors.map((color) => {
        const data = color.split(' ');
        if (Number(data[1]) > 14) return;
        else if (data[2] === 'green') {
            if (Number(data[1]) <= 13) validColorsCount++;
        } else if (data[2] === 'red') {
            if (Number(data[1]) <= 12) validColorsCount++;
        } else {
            validColorsCount++;
        }
    });
    if (validColorsCount === colors.length) validSetsCount++;
};

const part2 = (colors: string[]) => {
    colors.map((color) => {
        const data = color.split(' ');
        if (data[2] === 'green') {
            if (Number(data[1]) > greenMax) greenMax = Number(data[1]);
        } else if (data[2] === 'red') {
            if (Number(data[1]) > redMax) redMax = Number(data[1]);
        } else if (data[2] === 'blue') {
            if (Number(data[1]) > blueMax) blueMax = Number(data[1]);
        }
    });
};
reader.on('line', (l: string) => {
    validSetsCount = 0;
    greenMax = 0;
    blueMax = 0;
    redMax = 0;
    const info = l.split(':');
    const sets = info[1];

    sets.split(';').map((set) => {
        const colors = set.split(',');
        part1(colors);
        part2(colors);
    });
    part2Result = part2Result + greenMax * blueMax * redMax;
    if (validSetsCount === sets.split(';').length)
        part1Result += Number(info[0].split(' ')[1]);
});
reader.on('close', () => {
    console.log('part1:', part1Result + ' part2:', part2Result);
});
