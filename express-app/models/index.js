/* eslint-disable */
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const db = {};

const syncDb = (sequelize) => {
  fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return sequelize.sync();
}

export {
  syncDb,
  db
};