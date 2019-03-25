import { noop } from 'lodash';
import connect from './connect';

export default function insert(collectionName, data = [], callback = noop, fallback = noop) {
  connect((db, closeConnection) => {
    const collection = db.collection(collectionName);

    collection.insertMany(data, (err, result) => {
      if (err) fallback(err);
      else {
        callback(result);
        closeConnection();
      }
    });
  });
}
