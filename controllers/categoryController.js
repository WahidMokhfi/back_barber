const { Category, Service } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');

exports.findAllCategories = async (req, res) => {
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

exports.deleteCategory = (req, res) => {
  Category.findByPk(req.params.id, { include: [Service] })
    .then(categories => {
      if (!categories) {
        const message = "La catégorie que vous souhaitez supprimer n'existe pas.";
        return res.status(404).json({ message });
      }

      if (categories.services.length > 0) {
        const message = "Impossible de supprimer une catégorie qui contient des services associés.";
        return res.status(400).json({ message });
      }

      categories.destroy()
        .then(() => {
          const message = 'La catégorie a bien été supprimée.';
          res.json({ message });
        })
        .catch(error => {
          const message = 'Une erreur est survenue lors de la suppression.';
          res.status(500).json({ message });
        });
    })
    .catch(error => {
      const message = 'Une erreur est survenue lors de la récupération de la catégorie.';
      res.status(500).json({ message });
    });
};


exports.createCategory = (req, res) => {
  const { name, category_name, description } = req.body; // J'ajoute category_name et description
  Category.create({ name, category_name, description }) // que j'utilise dans les champs pour create
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









