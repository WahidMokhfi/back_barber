const { Sequelize } = require('sequelize');

const services = [
  {
    id: 1,
    name: "Coupe",
    service_name: "Service de coupe",
    description: "tarif unique",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    category_name: "Catégorie Cheveux", // Catégorie Cheveux
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 2,
    name: "Coloration",
    service_name: "Service de coloration",
    description: "décoloration, coloration",
    price: 25,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    category_name: "Catégorie Cheveux", // Catégorie Cheveux
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 3,
    name: "Défrisage",
    service_name: "Service de défrisage",
    description: "kératine",
    price: 20,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    category_name: "Catégorie Cheveux", // Catégorie Cheveux
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 4,
    name: "Barbe",
    service_name: "Service de barbe",
    description: "tondeuse, rasoir",
    price: 20,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 2,
    category_name: "Catégorie Barbe", // Catégorie Barbe
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 5,
    name: "Soin Vapeur",
    service_name: "Service de soin vapeur",
    description: "gommage du visage",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 3,
    category_name: "Catégorie Soin", // Catégorie Soin
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 6,
    name: "Épilation au fil",
    service_name: "Service d'épilation au fil",
    description: "épilation du visage au fil",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 3,
    category_name: "Catégorie Soin", // Catégorie Soin
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  }
];

module.exports = services;







  