import express from 'express';
import bodyParser from 'body-parser';
import { productsController, users, auth } from '../controllers';
import { queryParser, verify } from '../middlewares';

const router = express.Router();

router.use(express.json());
router.use(queryParser);
router.use(bodyParser.json());
router.use('/api/', verify);

router.post('/auth', auth.post);
router.post('/api/products', productsController.addProduct);
router.get('/api/products', productsController.getProducts);
router.get('/api/products/:id', productsController.id);
router.get('/api/products/:id/reviews', productsController.reviews);
router.get('/api/users', users);


export default router;
