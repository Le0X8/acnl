import { Buffer } from 'buffer/';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { parseGardenPlusDat, parseExhibitionDatWa, parseMydsgnDat } from './lib';

const mode: string = process.argv[3];

switch (mode) {
  case 'exhibition(wa)':
    const exhibitionDatWa = readFileSync(process.argv[2] + '/exhibition.dat');
    const exhibitionWa = parseExhibitionDatWa(exhibitionDatWa as unknown as Buffer);
    const output = JSON.stringify(exhibitionWa, null, 2);
    writeFileSync(process.argv[2] + '/exhibition.json', output);
    break;
  case 'garden_plus':
    const gardenPlusDat = readFileSync(process.argv[2] + '/garden_plus.dat');
    const gardenPlus = parseGardenPlusDat(gardenPlusDat as unknown as Buffer);
    const output1 = JSON.stringify(gardenPlus, null, 2);
    writeFileSync(process.argv[2] + '/garden_plus.json', output1);
    break;
  case 'mydsgn':
    const mydsgnDat = readFileSync(process.argv[2] + '/mydsgn1.dat');
    const mydsgn = parseMydsgnDat(mydsgnDat as unknown as Buffer);
    if (!existsSync(process.argv[2] + '/mydsgn')) mkdirSync(process.argv[2] + '/mydsgn');
    if (!existsSync(process.argv[2] + '/mydsgn/a')) mkdirSync(process.argv[2] + '/mydsgn/a');
    if (!existsSync(process.argv[2] + '/mydsgn/b')) mkdirSync(process.argv[2] + '/mydsgn/b');
    if (!existsSync(process.argv[2] + '/mydsgn/c')) mkdirSync(process.argv[2] + '/mydsgn/c');
    mydsgn.patterns.forEach((pattern, i) => {
      const cat = (10 + Math.floor(i / 24)).toString(13);
      const id = (1 + i % 24).toString(10).padStart(2, '0');
      writeFileSync(process.argv[2] + `/mydsgn/${cat}/${id}.acnl`, pattern);
    });
    break;
}
