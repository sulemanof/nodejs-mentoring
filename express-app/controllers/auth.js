import { find } from 'lodash';
import jwt from 'jsonwebtoken';
import { users } from '../models';

export const post = (req, res) => {
  const user = find(users, req.body);

  if (user) {
    const token = jwt.sign(user, 'secret');

    const response = {
      code: 200,
      message: 'OK',
      data: {
        user,
      },
      token,
    };

    res.send(response);
  } else {
    res.send({
      code: 404,
      message: 'Not Found',
      data: {},
    });
  }
};

export const get = () => {};
