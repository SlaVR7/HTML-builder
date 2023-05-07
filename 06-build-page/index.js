const fs = require('fs');
const path = require('path');

const projectDistDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');
const componentsDir = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const indexFile = path.join(projectDistDir, 'index.html');
const bundlePath = path.join(__dirname, 'project-dist/style.css');
const srcDir = path.join(__dirname, 'assets');
const destDir = path.join(__dirname, 'project-dist', 'assets');

// Создаем папку project-dist
fs.mkdir(projectDistDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  // Читаем шаблонный файл
  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return;
    }

    let numComponents = 0;

    // Читаем все файлы в папке components и заменяем соответствующие теги в шаблоне
    fs.readdir(componentsDir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      numComponents = files.length;

      files.forEach((file) => {
        const componentName = path.parse(file).name;
        const componentPath = path.join(componentsDir, file);
        fs.readFile(componentPath, 'utf8', (err, componentContent) => {
          if (err) {
            console.error(err);
            return;
          }

          const tag = `{{${componentName}}}`;
          template = template.replace(tag, componentContent);

          if (--numComponents === 0) {
            writeHtmlFile(template);
          }
        });
      });
    });
  });
});

function writeHtmlFile(content) {
  fs.writeFile(indexFile, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
}


// Собираем стили в один файл
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

// Копируем папку assets

function copyFolderRecursive(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      files.forEach((file) => {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
          copyFolderRecursive(srcPath, destPath);
        } else {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    });
  });
}

copyFolderRecursive(srcDir, destDir);

