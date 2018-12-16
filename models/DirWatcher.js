import fs from 'fs';
import EventEmitter from 'events';
import { difference } from 'lodash';

export default class extends EventEmitter {
  watch(path, delay) {
    let readFiles = [];

    setInterval(() => {
      fs.readdir(path, (err, files) => {
        const diff = difference(files, readFiles);

        files.forEach((file) => {
          if (Date.now() - fs.statSync(`${path}/${file}`).mtimeMs < delay) {
            diff.push(file);
          }
        });

        if (diff.length > 0) {
          this.emit('changed', [...new Set(diff)]);
        }

        readFiles = [...files];
      });
    }, delay);
  }
}
