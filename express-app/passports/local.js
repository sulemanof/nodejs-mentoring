import passport from 'passport';
import LocalStrategy from 'passport-local';
import { find } from 'lodash';
import { users } from '../models';


export default function initLocalPassport() {
  passport.use(new LocalStrategy((username, password, done) => {
    const user = find(users, { name: username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    } if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  }));
}
