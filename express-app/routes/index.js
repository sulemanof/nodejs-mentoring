import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { productsController, users, auth } from '../controllers';
import { queryParser, verify } from '../middlewares';
import {
  initFacebookPassport, initLocalPassport, initTwitterPassport, initGooglePassport,
} from '../passports';

const router = express.Router();

router.use(express.json());
router.use(queryParser);
router.use(bodyParser.json());
router.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use('/api/', verify);

initLocalPassport();
initFacebookPassport();
initTwitterPassport();
initGooglePassport();


function defaultCallback(req, res) {
  if (!req.user) {
    res.json({ error: 'User is not found' });
  } else {
    res.json(req.user);
  }
}

router.post('/auth/local', passport.authenticate('local', { session: false }), defaultCallback);

router.get('/auth/facebook', passport.authenticate('facebook', { session: false }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), defaultCallback);

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter'), defaultCallback);

router.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
router.get('/auth/google/callback', passport.authenticate('google'), defaultCallback);


router.post('/auth', auth.post);
router.post('/api/products', productsController.addProduct);
router.get('/api/products', productsController.getProducts);
router.get('/api/products/:id', productsController.id);
router.get('/api/products/:id/reviews', productsController.reviews);
router.get('/api/users', users);


export default router;
