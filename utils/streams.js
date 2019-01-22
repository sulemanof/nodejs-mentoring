const fs = require('fs');
const path = require('path');
const program = require('commander');
const colors = require('colors');
const through2 = require('through2');
const csv = require('csvtojson');
const CombinedStream = require('combined-stream');
const flattenDeep = require('lodash/flattenDeep');


const checkFilePath = (filePath, isDir = false) => new Promise((resolve, reject) => {
  const message = isDir ? 'folder' : 'file';

  if (!filePath) {
    reject(new Error(`Please provide a ${message} path for this action`));
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      reject(new Error(`Specified ${message} [ '${filePath}' ] doesn't exist`));
    } else {
      resolve(filePath);
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

const outputFile = file => fs.createReadStream(file).pipe(process.stdout);

const convertFromFile = file => fs.createReadStream(file)
  .pipe(csv())
  .pipe(process.stdout);

const convertToFile = (file) => {
  let isFirstChunk = true;

  fs.createReadStream(file)
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
    .pipe(fs.createWriteStream(file.replace(/\.[^.]+$/i, '.json')));
};

const getCssFiles = dir => flattenDeep(fs.readdirSync(dir)
  .map((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      return getCssFiles(filePath);
    }
    if (path.extname(filePath) === '.css') {
      return filePath;
    }
    return '';
  }).filter(filePath => !!filePath));

const cssBundler = (folder) => {
  const combinedStream = CombinedStream.create();
  const files = getCssFiles(folder);
  files.forEach((file) => {
    if (file.indexOf('nodejs-homework3.css') === -1 && file.indexOf('bundle.css') === -1) {
      combinedStream.append(fs.createReadStream(file));
    }
  });
  combinedStream.append(fs.createReadStream('./assets/nodejs-homework3.css'));
  combinedStream.pipe(fs.createWriteStream(path.join(folder, 'bundle.css')));
};

const actionHandler = () => {
  const filePath = program.file;
  const dirPath = program.path;
  let promise = Promise.resolve();

  switch (program.action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      transform();
      break;
    case 'outputFile':
      promise = checkFilePath(filePath).then(outputFile);
      break;
    case 'convertFromFile':
      promise = checkFilePath(filePath).then(convertFromFile);
      break;
    case 'convertToFile':
      promise = checkFilePath(filePath).then(convertToFile);
      break;
    case 'cssBundler':
      promise = checkFilePath(dirPath, true).then(cssBundler);
      break;
    default: {
      console.error('Invalid action type provided');
      program.outputHelp(colors.red);
    }
  }

  promise.catch(showError).then(() => program.outputHelp());
};

program
  .option('-a, --action <action>', 'Execute an action passed as param. Available actions: reverse, transform')
  .option('-f, --file <path>', 'Specify a path to the file, which will be used via the choosen action')
  .option('-p, --path <path>', 'Specify a path to the folder, which will be used to collect all .css files')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(colors.red);
} else {
  actionHandler();
}
