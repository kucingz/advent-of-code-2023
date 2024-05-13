import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('aoc1/input.txt'));

let result = 0;

reader.on('line', (l: string) => {
    const numbers = l.replace(/[^0-9]/g, '');
    if (numbers.length > 0) {
        if (numbers.length > 1) {
            result = result + Number(numbers[0] + numbers[numbers.length - 1]);
        } else {
            result = result + Number(numbers[0] + numbers[0]);
        }
    }
});
reader.on('close', () => {
    console.log(result);
});
