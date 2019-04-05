import Sequelize from 'sequelize';
import app from './app';
import db from './models';

const port = process.env.PORT || 8080;

const sequelize = new Sequelize('nodejs', 'postgres', 'password', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
    db.sequelize.sync().then(() => {
      console.log('Database was synchronized!');
      app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
      });
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
