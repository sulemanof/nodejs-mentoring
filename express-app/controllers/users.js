import { users } from '../models';

export default function (req, res) {
  res.json(users);
}
