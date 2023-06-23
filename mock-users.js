const { Sequelize } = require('sequelize');

const users = [
  {
    id: 1,
    username: "guillaume",
    email: "guillaume@example.com",
    phone_number: "1234567890",
    password: "password123",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 2,
    username: "olivier",
    email: "olivier@example.com",
    phone_number: "9876543210",
    password: "password456",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 3,
    username: "david",
    email: "david@example.com",
    phone_number: "5555555555",
    password: "password789",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 4,
    username: "paco",
    email: "paco@example.com",
    phone_number: "1111111111",
    password: "passwordabc",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 5,
    username: "chris",
    email: "chris@example.com",
    phone_number: "9999999999",
    password: "passwordxyz",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 6,
    username: "john",
    email: "john@example.com",
    phone_number: "4444444444",
    password: "passworddef",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 7,
    username: "momo",
    email: "momo@example.com",
    phone_number: "6666666666",
    password: "passwordghi",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 8,
    username: "Admin",
    email: "admin@example.com",
    phone_number: "123456789",
    password: "mdp",
    roles: "admin",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    id: 9,
    username: "Ayat",
    email: "user@example.com",
    phone_number: "987654321",
    password: "mdp",
    roles: "user",
    created: Sequelize.literal('CURRENT_TIMESTAMP'),
    updated: Sequelize.literal('CURRENT_TIMESTAMP')
  },

];

module.exports = users;
