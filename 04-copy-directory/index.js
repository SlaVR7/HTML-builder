const fs = require('fs');
const path = require('path');

function copyDir() {

  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      fs.unlink(path.join(path.join(__dirname, 'files-copy'), file), err => {
        if (err) throw err;
      });
    });
  });

  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, error => {
    if (error) {
      throw new Error('error');
    }
    process.stdout.write('folder created ');
    fs.readdir(path.join(__dirname, 'files'), (error, files) => {
      if (error) {
        throw new Error('error');
      }
      files.forEach(file => {
        const filePath = path.join(__dirname, 'files', file);
        fs.copyFile(filePath, path.join(__dirname, 'files-copy', file), error => {
          if (error) {
            throw new Error('error');
          }
          process.stdout.write(`${file} `);
        });
      });
    });
  });
}

copyDir();
