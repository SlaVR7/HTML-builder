const path = require('path'),
  fs = require('fs'),
  output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.stdout.write('Здравствуйте! Введите текст.\n');
process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.stdout.write('Goodbye!');
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  process.stdout.write('Goodbye');
  process.exit();
});