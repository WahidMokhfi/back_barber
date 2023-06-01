const bcrypt = require('bcrypt'); // Module pour le chiffrement des mots de passe
const { Sequelize, DataTypes } = require('sequelize'); // Module pour interagir avec la base de données
const ServiceModelSequelize = require('../models/service'); // Modèle pour les services
const UserModelSequelize = require('../models/user'); // Modèle pour les utilisateurs
const ReviewModelSequelize = require('../models/review'); // Modèle pour les avis
const services = require('../mock-services'); // Liste de services fictifs

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('barber_begles', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false // Désactiver les logs SQL
});

// Initialisation des modèles avec Sequelize et les types de données
const ServiceModel = ServiceModelSequelize(sequelize, DataTypes);
const UserModel = UserModelSequelize(sequelize, DataTypes);
const ReviewModel = ReviewModelSequelize(sequelize, DataTypes);

// Configuration de la relation entre les modèles
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

// Fonction pour initialiser la base de données
const initDb = async () => {
  try {
    await sequelize.sync();

    // Création des services dans la base de données
    for (const element of services) {
      const existingService = await ServiceModel.findOne({ where: { name: element.name } });
      if (existingService) {
        console.log(`Le service "${element.name}" existe déjà.`);
      } else {
        await ServiceModel.create({
          name: element.name,
          description: element.description,
          price: element.price,
          created: new Date()
        });
      }
    }

    // Vérification et création des utilisateurs
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

// Vérification de la connexion à la base de données et appel de la fonction d'initialisation
sequelize.authenticate()
  .then(() => {
    console.log('La connexion à la base de données a bien été établie.');
    initDb();
  })
  .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`));

// Ajout d'un index unique sur le champ "name" du modèle "Service"
ServiceModel.sync({ alter: true });

// Exportation des modules pour les utiliser dans d'autres fichiers
module.exports = {
  sequelize,
  ServiceModel,
  UserModel,
  initDb,
  ReviewModel
};






























































































