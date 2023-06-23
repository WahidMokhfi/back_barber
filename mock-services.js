const { Sequelize } = require('sequelize');

const services = [
  {
    id: 1,
    name: "Coupe",
    description: "tarif unique",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 2,
    name: "Coloration",
    description: "décoloration, coloration",
    price: 25,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 3,
    name: "Défrisage",
    description: "kératine",
    price: 20,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 1,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 4,
    name: "Barbe",
    description: "tondeuse, rasoir",
    price: 20,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 2,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 5,
    name: "Soin Vapeur",
    description: "gommage du visage",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 3,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 6,
    name: "Épilation au fil",
    description: "épilation du visage au fil",
    price: 15,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    category_id: 3,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  }
];

module.exports = services;



  