import { forEach } from 'lodash';
import insert from './insert';

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
      name: 'Moglev',
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
};

forEach(prefillData, (data, collection) => {
  insert(collection, data);
});
