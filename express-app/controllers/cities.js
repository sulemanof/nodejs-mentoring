import { sample } from 'lodash';
import nativeFind from '../mongodb/nativeDriver/find';
import City from '../mongodb/models/city';

const citiesController = {
  getCities(req, res) {
    City.find({}, (err, cities) => {
      if (err) res.status(404).json({ error: 'No products found' });
      else {
        res.json(cities);
      }
    });
  },

  postCities(req, res) {
    const {
      name, country, capital, location,
    } = req.body;

    City.create(
      {
        name, country, capital, location,
      },
      (err, city) => {
        if (err) console.log(err);
        else res.json(city);
      },
    );
  },

  putCity(req, res) {
    City.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      {},
      (err, matchedCity) => {
        if (!matchedCity) {
          const newCity = Object.assign(
            {},
            req.body,
            { id: Number(req.params.id) },
          );
          City.create(
            newCity,
            (error, city) => {
              if (error) console.log(error);
              else res.json(city);
            },
          );
        } else {
          res.json(matchedCity);
        }
      },
    );
  },

  removeCity(req, res) {
    City.remove(
      { id: Number(req.params.id) },
      (err) => {
        if (err) res.send(err);
        else res.json({ message: 'Deleted' });
      },
    );
  },

  getRandomCity(req, res) {
    /* without mongoose */
    // nativeFind(
    //   'cities',
    //   {},
    //   (cities) => {
    //     const randomCity = sample(cities);
    //     res.json(randomCity);
    //   },
    //   err => res.status(404).json({ error: 'No cities found' }),
    // );

    City.find({}, (err, cities) => {
      if (err) res.status(404).json({ error: 'No cities found' });
      else {
        const randomCity = sample(cities);
        res.json(randomCity);
      }
    });
  },
};

export default citiesController;
