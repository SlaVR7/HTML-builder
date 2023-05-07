const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    if (file.isFile()) {
      const fileName = file.name;
      const fileExt = path.extname(fileName);

      fs.stat(path.join(folderPath, fileName), (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${fileName.replace(fileExt, '')} - ${fileExt.replace('.', '')} - ${stats.size} `);
      });
    }
  });
});
