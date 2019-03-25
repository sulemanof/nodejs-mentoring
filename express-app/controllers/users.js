// import { users } from '../models';

// export default function (req, res) {
//   res.json(users);
// }

import { User } from '../mongodb/models';


const userContoller = {
  getUsers(req, res) {
    User.find({}, (err, users) => {
      if (err) res.status(404).json({ error: 'No users found' });
      else {
        res.json(users);
      }
    });
  },
  deleteUser(req, res) {
    User.remove(
      { id: Number(req.params.id) },
      (err) => {
        if (err) res.send(err);
        else res.json({ message: 'Deleted' });
      },
    );
  },
};

export default userContoller;
