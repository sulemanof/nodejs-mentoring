import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { find } from 'lodash';
import { users } from '../models';

const APP_ID = '635767716898-sk7c64kno8jgom23n8dj3n3kejsejch1.apps.googleusercontent.com';
const APP_SECRET = 'zJ2557skonaR5Rd0LBdLsJy8';

export default function initGooglePassport() {
  passport.use(new GoogleStrategy(
    {
      clientID: APP_ID,
      clientSecret: APP_SECRET,
      callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const registeredUser = find(users, { name: profile.displayName });
      if (!registeredUser) {
        return done(null, false, 'User with given data is not registered');
      }
      return done(null, registeredUser);
    },
  ));
}
