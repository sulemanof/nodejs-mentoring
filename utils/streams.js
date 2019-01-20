const fs = require('fs');
const program = require('commander');
const colors = require('colors');
const through2 = require('through2');

const makeRed = txt => colors.red(txt);

const reverse = () => process.stdin.pipe(process.stdout);

const transform = () => process.stdin
  .pipe(through2(function (chunk, enc, callback) {
    this.push(`${chunk}`.toUpperCase());
    callback();
  })).pipe(process.stdout);

const outputFile = () => fs.createReadStream().pipe(process.stdout);

const actionHandler = (action) => {
  switch (action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      transform();
      break;
    case 'outputFlie':
      outputFile();
      break;
    default: {
      console.error('Invalid action type');
      program.outputHelp(makeRed);
    }
  }
};

program
  .option('-a, --action <action>', 'Execute an action passed as param. Available actions: reverse, transform')
  .option('-f, --file [path]', 'Specify a path to the file, which will be used via the choosen action')
  .action(() => {
    if (!process.argv.slice(2).length) {
      program.outputHelp(makeRed);

      return;
    }

    if (typeof program.action === 'string') {
      actionHandler(program.action);
    }
  })
  .parse(process.argv);
