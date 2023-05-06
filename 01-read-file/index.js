const path = require('path');
const fs = require('fs');
const input = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf-8');
input.on('data', data => process.stdout.write(data));
