const fs = require('fs'),
  path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
process.stdout.write('Здравствуйте! Введите текст.\n');
process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.stdout.write('Пока!');
    process.exit();
  }
  writeStream.write(data);
});

process.on('SIGINT', () => {
  process.stdout.write('Пока!');
  process.exit();
});