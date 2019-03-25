import app from './app';
import connect from './mongodb';

const port = process.env.PORT || 8080;

connect(() => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
