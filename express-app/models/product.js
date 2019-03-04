module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    cost: DataTypes.STRING,
  }, {});
  Product.associate = function (models) {
    Product.hasMany(models.Reviews);
  };
  return Product;
};
