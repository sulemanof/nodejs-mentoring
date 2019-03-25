import { City, Product, User } from './models';
import connect from '.';

const prefillData = {
  cities: [
    {
      name: 'Brest',
      country: 'Belarus',
      capital: false,
      location: {
        lat: 52.097621,
        long: 23.734050,
      },
    },
    {
      name: 'Mogilev',
      country: 'Belarus',
      capital: false,
      location: {
        lat: 52.11,
        long: 23.222,
      },
    },
    {
      name: 'Minsk',
      country: 'Belarus',
      capital: true,
      location: {
        lat: 52.097621,
        long: 23.734050,
      },
    },
  ],
  users: [
    {
      id: 1,
      name: 'Alex',
      password: '12345678',
      isModerator: true,
      email: 'alex22@gmail.com',
    },
    {
      id: 2,
      name: 'Ivan',
      password: '2233445566',
      isModerator: false,
      email: 'Ivan2@gmail.com',
    },
    {
      id: 3,
      name: 'Jhon',
      password: '555222333',
      isModerator: false,
      email: 'Jhon@gmail.com',
    },
  ],
  products: [
    {
      id: 1, name: 'MacBook', cost: '1999', reviews: 'Hello!',
    },
    {
      id: 2, name: 'Acer', cost: '999', reviews: 'Bye!',
    },
  ],
};

connect(() => {
  City.insertMany(prefillData.cities, (err) => {
    if (err) console.log('City insertion error!');
    else console.log('City prefill success');
  });

  User.insertMany(prefillData.users, (err) => {
    if (err) console.log('User insertion error!');
    else console.log('User prefill success');
  });

  Product.insertMany(prefillData.products, (err) => {
    if (err) console.log('Product insertion error!');
    else console.log('Product prefill success');
  });
});
