const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const cssFiles = files.filter(file => path.extname(file) === '.css');

  let fileContents = '';
  let processed = 0;

  cssFiles.forEach((file) => {
    const filePath = path.join(stylesDir, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      fileContents += data + '\n';
      processed++;

      if (processed === cssFiles.length) {
        fs.writeFile(bundlePath, fileContents, err => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  });
});