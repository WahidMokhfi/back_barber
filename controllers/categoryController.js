const { Category, Service } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');

exports.findAllCategories = async (req, res) => {
  // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
  const token = req.header("Authorization");
  if (!token) {
      return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
  }

  try {
      const categories = await Category.findAll();
      const message = 'La liste des catégories a bien été récupérée en base de données.';
      res.json({ message, data: categories });
  } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      const message = 'Une erreur est survenue.';
      res.status(500).json({ message });
  }
};


exports.getCategoryDetails = (req, res) => {
  // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
  const token = req.header("Authorization");
  if (!token) {
      return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
  }

  const categoryId = req.params.id;

  Category.findByPk(categoryId, { include: [Service] })
      .then(category => {
          if (!category) {
              const message = "Aucune catégorie trouvée avec cet identifiant.";
              return res.status(404).json({ message });
          }

          res.json({ message: "Détails de la catégorie récupérés avec succès.", data: category });
      })
      .catch(error => {
          const message = "Une erreur est survenue lors de la récupération des détails de la catégorie.";
          res.status(500).json({ message });
      });
};


exports.updateCategory = (req, res) => {
  // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
  const token = req.header("Authorization");
  if (!token) {
      return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
  }

  Category.update(req.body, { where: { id: req.params.id } })
      .then(result => {
          if (result[0] === 0) {
              const message = "La catégorie que vous souhaitez mettre à jour n'existe pas.";
              res.status(404).json({ message });
          } else {
              const message = 'La catégorie a bien été mise à jour.';
              res.json({ message });
          }
      })
      .catch(error => {
          if (error instanceof ValidationError) {
              const message = 'Les données de la catégorie sont invalides.';
              res.status(400).json({ message, data: error.errors });
          } else {
              const message = 'Une erreur est survenue.';
              res.status(500).json({ message });
          }
      });
};

exports.deleteCategory = async (req, res) => {
  // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
  const token = req.header("Authorization");
  if (!token) {
      return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
  }

  try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
          return res.status(404).json({ message: "La catégorie demandée n'existe pas." });
      }

      const categoryName = category.category_name;
      await Category.destroy({
          where: {
              id: categoryId,
          },
      });

      res.json({ message: `La catégorie ${categoryName} a bien été supprimée.` });
  } catch (error) {
      console.error('Une erreur est survenue lors de la suppression de la catégorie :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la catégorie.', error: error.message });
  }
};

exports.createCategory = (req, res) => {
  // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
  const token = req.header("Authorization");
  if (!token) {
      return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
  }

  const { category_name, description } = req.body;
  Category.create({ category_name, description })
      .then(category => {
          const message = 'La catégorie a bien été créée.';
          res.status(201).json({ message, data: category });
      })
      .catch(error => {
          if (error instanceof ValidationError) {
              const message = 'Les données de la catégorie sont invalides.';
              res.status(400).json({ message, data: error.errors });
          } else if (error instanceof UniqueConstraintError) {
              const message = 'Une catégorie avec ce nom existe déjà.';
              res.status(400).json({ message });
          } else {
              const message = 'Une erreur est survenue.';
              res.status(500).json({ message });
          }
      });
};










