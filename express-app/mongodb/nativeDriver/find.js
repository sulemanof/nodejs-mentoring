import { noop } from 'lodash';
import connect from './connect';

export default function find(collectionName, query, callback = noop, fallback = noop) {
  connect((db, closeConnection) => {
    const collection = db.collection(collectionName);

    collection.find(query).toArray((err, docs) => {
      if (err) fallback(err);
      else callback(docs);
      closeConnection(docs);
    });
  });
}
