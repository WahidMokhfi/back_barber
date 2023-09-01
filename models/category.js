const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {}
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: false
    }
  );

  // Association avec mes services
  Category.associate = (models) => {
    Category.hasMany(models.Service, {
      foreignKey: 'category_id',
      as: 'services',
      onDelete: "CASCADE", // Ajout de cette option pour la suppression en cascade
    });
  };

  return Category;
};


































































