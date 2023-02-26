const acnl = require('../src/main');
const fs = require('fs');
var pattern = new acnl.dataType.Pattern(fs.readFileSync('./pat.acnl'));
console.log(pattern);