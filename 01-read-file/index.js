const fs = require('fs'),
  path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readStream.on('data', (output) => process.stdout.write(output));