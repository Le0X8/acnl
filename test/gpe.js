const acnl = require('../src/main');
const fs = require('fs');
var editor = new acnl.editor.GardenPlus(fs.readFileSync('./garden_plus.dat'));
console.log(editor);