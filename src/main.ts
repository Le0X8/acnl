import { readFileSync, writeFileSync } from 'fs';
import { parseGardenPlusDat } from './lib';

const gardenPlusDat = readFileSync(process.argv[2] + '/garden_plus.dat');
const gardenPlus = parseGardenPlusDat(gardenPlusDat);

const output = JSON.stringify(gardenPlus, null, 2);
writeFileSync(process.argv[2] + '/garden_plus.json', output);