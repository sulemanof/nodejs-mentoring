import { db } from '../models';

const productsController = {
  getProducts(req, res) {
    db.Product.findAll({ include: [{ model: db.Reviews }] })
      .then((products) => {
        res.json(products);
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: 'No products available' });
      });
  },

  addProduct(req, res) {
    const { cost, name, reviews } = req.body;
    db.Product.create({
      name,
      cost,
      Reviews: reviews,
    })
      .then(() => {
        db.Product.findAll({ include: [{ model: db.Reviews }] })
          .then((products) => {
            res.status(200).send(products);
          });
      })
      .catch(console.log);
  },

  id(req, res) {
    db.Product.findById(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: e.name });
      });
  },

  reviews(req, res) {
    db.Reviews.findOne({
      where: { ProductId: Number(req.params.id) },
    })
      .then((reviews) => {
        res.json(reviews);
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: 'No reviews found by the given id' });
      });
  },
};

export default productsController;
