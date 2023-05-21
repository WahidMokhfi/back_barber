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
    allowNull: false
  }
});
ReviewModel.belongsTo(UserModel);

ServiceModel.hasMany(ReviewModel, {
  foreignKey: {
    allowNull: false
  }
});
ReviewModel.belongsTo(ServiceModel);

const initDb = async () => {
  try {
    await sequelize.sync();
    // Créer les services dans la base de données en vérifiant l'existence préalable
    for (const element of services) {
      const existingService = await ServiceModel.findOne({ where: { name: element.name } });
      if (existingService) {
        console.log(`Le service "${element.name}" existe déjà.`);
      } else {
        await ServiceModel.create({
          name: element.name,
          description: element.description,
          price: element.price,
          CategoryId: element.categoryId
        });
      }
    }

    // Vérifier si l'utilisateur 'wahid' existe déjà
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

    // Vérifier si l'utilisateur 'ayat' existe déjà
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

// Ajouter l'index unique sur le champ "name" du modèle "Service"
ServiceModel.sync({ alter: true });

module.exports = {
  sequelize,
  ServiceModel,
  UserModel,
  initDb,
  ReviewModel
};








