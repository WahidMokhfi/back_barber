const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const ServiceModelSequelize = require('../models/service');
const UserModelSequelize = require('../models/user');
const ReviewModelSequelize = require('../models/review');
const services = require('../mock-services');

const sequelize = new Sequelize('barber_begles', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false
});

const ServiceModel = ServiceModelSequelize(sequelize, DataTypes);
const UserModel = UserModelSequelize(sequelize, DataTypes);
const ReviewModel = ReviewModelSequelize(sequelize, DataTypes);

UserModel.hasMany(ReviewModel, {
  foreignKey: {
    allowNull: false,
    name: 'user_id'
  }
});
ReviewModel.belongsTo(UserModel, {
  foreignKey: 'user_id'
});

const initDb = async () => {
  try {
    await sequelize.sync();

    for (const element of services) {
      const existingService = await ServiceModel.findOne({ where: { name: element.name } });
      if (existingService) {
        console.log(`Le service "${element.name}" existe déjà.`);
      } else {
        await ServiceModel.create({
          name: element.name,
          description: element.description,
          price: element.price,
          created_at: new Date()
        });
      }
    }

    let user = await UserModel.findOne({ where: { username: 'wahid' } });
    if (user) {
      console.log('L\'utilisateur "wahid" existe déjà.');
    } else {
      const hash = await bcrypt.hash('mdp', 10);
      await UserModel.create({
        username: 'wahid',
        password: hash,
        roles: ['user', 'admin']
      });
    }

    user = await UserModel.findOne({ where: { username: 'ayat' } });
    if (user) {
      console.log('L\'utilisateur "ayat" existe déjà.');
    } else {
      const hash = await bcrypt.hash('mdp', 10);
      await UserModel.create({
        username: 'ayat',
        password: hash,
        roles: ['user']
      });
    }

    console.log("La liste des services et des utilisateurs a bien été créée.");
  } catch (error) {
    console.log('Erreur:', error);
  }
};

sequelize.authenticate()
  .then(() => {
    console.log('La connexion à la base de données a bien été établie.');
    initDb();
  })
  .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`));

ServiceModel.sync({ alter: true });

module.exports = {
  sequelize,
  ServiceModel,
  UserModel,
  initDb,
  ReviewModel
};

































































































