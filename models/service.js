const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {}

  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      timestamps: false,
    }
  );

  // Définir l'association avec la catégorie
  Service.belongsTo(sequelize.models.Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'CASCADE', 
  });

  return Service;
};







































































































































































