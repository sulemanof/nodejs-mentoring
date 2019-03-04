import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { find } from 'lodash';
import { users } from '../models';

const APP_ID = 'w4qvekl1age6jpPvcA5TKpCOd';
const APP_SECRET = 'ohJb5xdfiITvSXmVf6U9BBDoy2RKMhFIV2khvAmN9NGX6YICIz';

export default function initTwitterPassport() {
  passport.use(new TwitterStrategy(
    {
      consumerKey: APP_ID,
      consumerSecret: APP_SECRET,
      callbackURL: 'http://localhost:8080/auth/twitter/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const registeredUser = find(users, { name: profile.displayName });
      if (!registeredUser) {
        return done(null, false, 'User with given data is not registered');
      }
      return done(null, registeredUser);
    },
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
