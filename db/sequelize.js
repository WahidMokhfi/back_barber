const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const CategoryModel = require('../models/category');
const ServiceModel = require('../models/service');
const ReviewModel = require('../models/review');
const services = require('../mock-services');
const categories = require('../mock-category');
const reviews = require('../mock-reviews');
const users = require('../mock-users');

const sequelize = new Sequelize('barber_begles', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false
});

const User = UserModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Service = ServiceModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);

User.hasMany(Review, {
  foreignKey: {
    allowNull: false,
    name: 'user_id'
  }
});
Review.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Service, {
  foreignKey: {
    allowNull: false,
    name: 'category_id'
  }
});
Service.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
    name: 'category_id'
  }
});

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('La connexion à la base de données a bien été établie.');

    // Recrée complètement la base de données en supprimant les tables existantes
    await sequelize.sync({ force: true });
    console.log('Les 4 tables ont été recréées avec succès.');

    // Initialisation des catégories, services, utilisateurs et avis...
    for (const element of categories) {
      if (element.category_name) {
        const existingCategory = await Category.findOne({ where: { category_name: element.category_name } });
        if (existingCategory) {
          console.log(`La catégorie "${element.name}" existe déjà.`);
        } else {
          await Category.create({
            description: element.description,
            category_name: element.category_name,
          });
        }
      }
    }

    // Initialisation des services
    for (const element of services) {
      if (element.service_name && element.category_id) {
        const category = await Category.findByPk(element.category_id);
        if (category) {
          const existingService = await Service.findOne({ where: { service_name: element.service_name, category_id: category.id } });
          if (existingService) {
            console.log(`Le service "${element.service_name}" existe déjà dans la catégorie "${category.category_name}".`);
          } else {
            await Service.create({
              description: element.description,
              service_name: element.service_name,
              price: element.price,
              createdAt: element.createdAt,
              updatedAt: element.updatedAt,
              category_id: category.id,
              category_name: element.category_name,
            });
          }
        } else {
          console.log(`La catégorie avec l'ID "${element.category_id}" n'existe pas.`);
        }
      }
    }

    // Initialisation des utilisateurs
    for (const element of users) {
      const existingUser = await User.findOne({ where: { username: element.username } });
      if (existingUser) {
        console.log(`L'utilisateur "${element.username}" existe déjà.`);
      } else {
        const hash = await bcrypt.hash(element.password, 10);
        await User.create({
          username: element.username,
          password: hash,
          roles: element.roles,
          created: element.created,
          email: element.email,
          phone_number: element.phone_number
        });
      }
    }

    // Initialisation des avis
    for (const element of reviews) {
      const user = await User.findByPk(element.user_id);
      const service = await Service.findByPk(element.service_id);
      if (user && service) {
        const existingReview = await Review.findOne({ where: { user_id: user.id, service_id: service.id } });
        if (!existingReview && element.rating === 5) {
          await Review.create({
            content: element.content,
            rating: element.rating,
            user_id: user.id,
            service_id: service.id,
            service_name: element.service_name,
            username: element.username,
            date: element.date,
          });
        }
      } else {
        console.log(`L'utilisateur avec l'ID "${element.user_id}" ou le service avec l'ID "${element.service_id}" n'existe pas.`);
      }
    }

    console.log('Initialisation de la base de données terminée.');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
  }
};

module.exports = {
  sequelize,
  Service,
  User,
  Review,
  Category,
  initDb
};









































































































































