const { Sequelize } = require('sequelize');

const services = [
  {
    id: 1,
    service_name: "Coupe",
    description: "tarif unique",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    category_name: "Catégorie Cheveux", 
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 2,
    service_name: "Coloration",
    description: "décoloration, coloration",
    price: 25,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    category_name: "Catégorie Cheveux", 
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 3,
    service_name: "Défrisage",
    description: "kératine",
    price: 20,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    category_name: "Catégorie Cheveux", 
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 4,
    service_name: "Barbe",
    description: "tondeuse, rasoir",
    price: 20,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 2,
    category_name: "Catégorie Barbe", 
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 5,
    service_name: "Soin vapeur",
    description: "gommage du visage",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 3,
    category_name: "Catégorie Soin", 
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 6,
    service_name: "Épilation au fil",
    description: "épilation du visage au fil",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 3,
    category_name: "Catégorie Soin", 
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  }
];

module.exports = services;







  