const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {}
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
  });

  return Category;
};





























































