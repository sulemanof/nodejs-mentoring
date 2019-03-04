module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    reviews: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
  }, {});
  Reviews.associate = function (models) {
    Reviews.belongsTo(models.Product);
  };
  return Reviews;
};
