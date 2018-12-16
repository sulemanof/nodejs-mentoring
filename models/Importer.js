import fs from 'fs';
import parse from 'csv-parse/lib/sync';
import DirWatcher from './DirWatcher';

const parseOptions = {
  columns: true,
  skip_empty_lines: true,
};

export default class {
  constructor(path, delay) {
    const dirWatcher = new DirWatcher();

    dirWatcher.watch(path, delay);
    dirWatcher.on('changed', diff => diff.forEach((file) => {
      console.log(this.importSync(`${path}/${file}`));
    }));
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    }).then(data => parse(data, parseOptions))
      .catch(error => console.error(error));
  }

  importSync(path) {
    return parse(fs.readFileSync(path, 'utf8'), parseOptions);
  }
}
