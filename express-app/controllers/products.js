import fs from 'fs';
import { find, get } from 'lodash';
import { products } from '../models';


const productsController = {
  getProducts(req, res) {
    res.json(products);
  },

  addProduct(req, res) {
    const newProduct = req.body;
    const newProducts = JSON.stringify([...products, newProduct], null, '\t');
    fs.writeFileSync('express-app/models/products.json', newProducts);
    res.status(200).send(newProducts);
  },

  id(req, res) {
    const product = find(products, { id: req.params.id })
    || { error: 'No products found by the given id' };
    res.json(product);
  },

  reviews(req, res) {
    const product = find(products, { id: req.params.id });
    const review = get(product, 'reviews', { error: 'No reviews where found for provided id' });
    res.json(review);
  },
};

export default productsController;
