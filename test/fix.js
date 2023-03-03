// This script can be used to fix corrupted files.

const acnl = require('../src/main');
const fs = require('fs');
var savegame = fs.readFileSync('./garden_plus_corrupted.dat');
acnl.dataType.checksum(savegame);
fs.writeFileSync('./garden_plus_fixed.dat', savegame);