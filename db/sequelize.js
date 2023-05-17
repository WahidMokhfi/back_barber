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
    return sequelize.sync() 
    .then(() => {
        // création des 11 coworkings dans la bdd, avec une boucle, 
        // message à afficher en console : La liste des {11} coworkings a bien été créée.
        // coworkings.forEach((element) => {
        //     CoworkingModel.create({
        //         name: element.name,
        //         price: element.price,
        //         address: element.address,
        //         superficy: element.superficy,
        //         capacity: element.capacity,
        //     })
        // })

        // bcrypt.hash('mdp', 10)
        //     .then((hash) => {
        //         UserModel.create({
        //             username: 'paul',
        //             password: hash,
        //             roles: ['user', 'admin']
        //         })
        //     })
        //     .catch(err => console.log(err))

        // bcrypt.hash('mdp', 10)
        // .then((hash) => {
        //     UserModel.create({
        //         username: 'pierre',
        //         password: hash,
        //         roles: ['user']
        //     })
        // })
        // .catch(err => console.log(err))
    })
    .catch(error => console.log('Erreur'))
}

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
    sequelize, ServiceModel, UserModel, initDb, ReviewModel
}





