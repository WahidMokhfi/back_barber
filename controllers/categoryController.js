const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { CategoryModel, ServiceModel } = require('../db/sequelize');

exports.findAllCategories = (req, res) => {
    CategoryModel.findAll()
        .then((categories) => {
            const message = 'La liste des catégories a bien été récupérée en base de données.';
            res.json({ message, data: categories });
        })
        .catch((error) => {
            const message = 'Une erreur est survenue.';
            res.status(500).json({ message });
        });
};

exports.createCategory = (req, res) => {
    const { name } = req.body;
    CategoryModel.create({ name })
        .then((category) => {
            const message = 'La catégorie a bien été créée.';
            res.status(201).json({ message, data: category });
        })
        .catch((error) => {
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

exports.updateCategory = (req, res) => {
    const { name } = req.body;
    CategoryModel.update({ name }, { where: { id: req.params.id } })
        .then((result) => {
            if (result[0] === 0) {
                const message = "La catégorie que vous souhaitez mettre à jour n'existe pas.";
                res.status(404).json({ message });
            } else {
                const message = 'La catégorie a bien été mise à jour.';
                res.json({ message });
            }
        })
        .catch((error) => {
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
    CategoryModel.findById(req.params.id, { include: [ServiceModel] })
        .then((category) => {
            if (!category) {
                const message = "La catégorie que vous souhaitez supprimer n'existe pas.";
                return res.status(404).json({ message });
            }

            if (category.Services.length > 0) {
                const message = "Impossible de supprimer une catégorie qui contient des services associés.";
                return res.status(400).json({ message });
            }

            return category.destroy()
                .then(() => {
                    const message = 'La catégorie a bien été supprimée.';
                    res.json({ message });
                });
        })
        .catch((error) => {
            const message = 'Une erreur est survenue.';
            res.status(500).json({ message });
        });
};

exports.findCategoryById = (req, res) => {
    const categoryId = req.params.id;
    CategoryModel.findById(categoryId)
        .then((category) => {
            if (!category) {
                const message = 'Aucune catégorie trouvée avec cet identifiant.';
                res.status(404).json({ message });
            } else {
                const message = 'La catégorie a été trouvée avec succès.';
                res.json({ message, data: category });
            }
        })
        .catch((error) => {
            const message = 'Une erreur est survenue.';
            res.status(500).json({ message });
        });
};




