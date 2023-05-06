const fs = require('fs'),
  path = require('path'),
  prom = fs.promises;
prom.readdir(path.join(__dirname, 'secret-folder'), {
  withFileTypes: true
}).then(res => {
  res.forEach(output => {
    if (output.isDirectory() === false) {
      let filePath = path.join(__dirname, 'secret-folder', output.name),
        fileName = path.basename(filePath),
        fileExt = path.extname(filePath);
      prom.stat(filePath).then(res => {
        process.stdout.write(fileName.replace(fileExt, '') + ' - ' + fileExt.replace('.', '') + ' - ' + res.size + 'bytes\n');
      });
    }
  });
});

