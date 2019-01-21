const fs = require('fs');
const https = require('https');
const program = require('commander');
const colors = require('colors');
const through2 = require('through2');
const csv = require('csvtojson');

const checkFilePath = path => new Promise((resolve, reject) => {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      reject(new Error(`Specified file doesn't exist - ${path}`));
    } else {
      resolve();
    }
  });
});

const showError = err => console.error(colors.red(err));

const reverse = () => process.stdin.pipe(process.stdout);

const transform = () => process.stdin
  .pipe(through2(function (chunk, enc, callback) {
    this.push(`${chunk}`.toUpperCase());
    callback();
  })).pipe(process.stdout)
  .on('error', showError);

const outputFile = () => {
  const path = program.file;

  checkFilePath(path)
    .then(() => fs.createReadStream(path).pipe(process.stdout))
    .catch(showError);
};

const convertFromFile = () => {
  const path = program.file;

  checkFilePath(path)
    .then(() => fs.createReadStream(path)
      .pipe(csv())
      .pipe(process.stdout)
      .on('error', showError))
    .catch(showError);
};

const convertToFile = () => {
  const path = program.file;

  checkFilePath(path)
    .then(() => {
      let isFirstChunk = true;

      fs.createReadStream(path)
        .pipe(csv())
        .pipe(through2(function (chunk, enc, callback) {
          if (isFirstChunk) {
            this.push(`[\n${chunk}`);
            isFirstChunk = false;
          } else {
            this.push(`,${chunk}`);
          }
          callback();
        }, function (callback) {
          this.push(']');
          callback();
        }))
        .pipe(fs.createWriteStream(path.replace(/\.[^.]+$/i, '.json')))
        .on('error', showError);
    }).catch(showError);
};

const cssBundler = () => {
  const url = 'https://epa.ms/nodejs18-hw3-css';


  https.get(url, (res) => {
    res.pipe(fs.createWriteStream('bundle.css'));
  });
};

const actionHandler = (action) => {
  switch (action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      transform();
      break;
    case 'outputFile':
      outputFile();
      break;
    case 'convertFromFile':
      convertFromFile();
      break;
    case 'convertToFile':
      convertToFile();
      break;
    case 'cssBundler':
      cssBundler();
      break;
    default: {
      console.error('Invalid action type');
      program.outputHelp(colors.red);
    }
  }
};

program
  .option('-a, --action <action>', 'Execute an action passed as param. Available actions: reverse, transform')
  .option('-f, --file <path>', 'Specify a path to the file, which will be used via the choosen action')
  .option('-p, --path <path>', 'Specify a path to the folder, which will be used to collect all .css files')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(colors.red);
} else {
  actionHandler(program.action);
}
