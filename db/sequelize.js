const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const ServiceModelSequelize = require('../models/service')
const UserModelSequelize = require('../models/user')
const ReviewModelSequelize = require('../models/review')
const services = require('../mock-services');

const sequelize = new Sequelize('barber_begles', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false
});

const ServiceModel = ServiceModelSequelize(sequelize, DataTypes)
const UserModel = UserModelSequelize(sequelize, DataTypes)
const ReviewModel = ReviewModelSequelize(sequelize, DataTypes)

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

const initDb = () => {
  return sequelize
    .sync()
    .then(() => {
      // Créer les services dans la base de données


      // // <----- Je Commente cette partie pour éviter l'insertion répétée des enregistrements de services ----->

      // services.forEach((element) => {
      //   ServiceModel.create({
      //     name: element.name,
      //     description: element.description,
      //     price: element.price,
      //     CategoryId: element.categoryId 
      //   })
      //     .catch(err => console.log(err));
      // });


      // bcrypt.hash('mdp', 10)
      //   .then((hash) => {
      //     UserModel.create({
      //       username: 'wahid',
      //       password: hash,
      //       roles: ['user', 'admin']
      //     })
      //   })
      //   .catch(err => console.log(err));

      // bcrypt.hash('mdp', 10)
      //   .then((hash) => {
      //     UserModel.create({
      //       username: 'ayat',
      //       password: hash,
      //       roles: ['user']
      //     })
      //   })
      //   .catch(err => console.log(err));

      // // <----- Je Commente cette partie pour éviter l'insertion répétée des enregistrements d'utilisateurs ----->

      console.log("La liste des services et des utilisateurs a bien été créée.");
    })
    .catch(error => console.log('Erreur'));
}

sequelize.authenticate()
  .then(() => console.log('La connexion à la base de données a bien été établie.'))
  .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
  sequelize,
  ServiceModel,
  UserModel,
  initDb,
  ReviewModel
}






