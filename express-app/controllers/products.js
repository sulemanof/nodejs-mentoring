import fs from 'fs';
import { find, get } from 'lodash';
import { Product } from '../mongodb/models';


// const productsController = {
//   getProducts(req, res) {
//     res.json(products);
//   },

//   addProduct(req, res) {
//     const newProduct = req.body;
//     const newProducts = JSON.stringify([...products, newProduct], null, '\t');
//     fs.writeFileSync('express-app/models/products.json', newProducts);
//     res.status(200).send(newProducts);
//   },

//   id(req, res) {
//     const product = find(products, { id: req.params.id })
//     || { error: 'No products found by the given id' };
//     res.json(product);
//   },

//   reviews(req, res) {
//     const product = find(products, { id: req.params.id });
//     const review = get(product, 'reviews', { error: 'No reviews where found for provided id' });
//     res.json(review);
//   },
// };

const productsController = {
  productsGet(req, res) {
    Product.find({}, (err, products) => {
      if (err) res.status(404).json({ error: 'No products found' });
      else {
        res.json(products);
      }
    });
  },

  productsDelete(req, res) {
    Product.remove(
      { id: Number(req.params.id) },
      (err) => {
        if (err) res.send(err);
        else res.json({ message: 'Deleted' });
      },
    );
  },

  productsPost(req, res) {
    const {
      cost, name, reviews, id,
    } = req.body;

    Product.create(
      {
        id,
        cost,
        name,
        reviews,
      },
      (err, product) => {
        if (err) console.log(err);
        else res.json(product);
      },
    );
  },

  id(req, res) {
    Product.findOne({ id: Number(req.params.id) }, (err, product) => {
      if (err) res.status(404).json({ error: 'No product found by given id' });
      else {
        res.json(product);
      }
    });
  },

  reviews(req, res) {
    Product.findOne({ id: Number(req.params.id) }, (err, product) => {
      if (err || !product) res.status(404).json({ error: 'No reviews found for required product' });
      else {
        res.json(product.reviews);
      }
    });
  },
};


export default productsController;
