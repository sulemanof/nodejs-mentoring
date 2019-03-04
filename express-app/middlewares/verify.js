import jwt from 'jsonwebtoken';

export default function verify(req, res, next) {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'secret', (err) => {
      if (err) {
        res.status(403).json({ success: false, message: 'Failed to authenticate token' });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: 'No token provided' });
  }
}
