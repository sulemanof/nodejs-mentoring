import config from './config/config';
import { Product, User, Importer } from './models';

console.log(config.name);

const product = new Product();
const user = new User();

const importer = new Importer('data', 3000);

console.log(importer.importSync('./data/data.csv'));
importer.import('./data/data.csv').then(data => console.log(data));
