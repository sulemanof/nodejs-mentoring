import db from '../models';

export default function (req, res) {
  db.User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.json({ error: 'No users registered' });
    });
}
