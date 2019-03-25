import { MongoClient } from 'mongodb';
import { noop } from 'lodash';
import { url, dbName } from '../constants';

export default function connect(callback = noop) {
  MongoClient.connect(url, (err, client) => {
    if (err) console.log(`Error${err}`);
    else {
      console.log('Connected successfully to server');

      const db = client.db(dbName);
      callback(db, () => {
        client.close();
      });
    }
  });
}
