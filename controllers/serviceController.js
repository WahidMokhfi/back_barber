const { Service, Review } = require('../db/sequelize');
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');

exports.findAllServices = (req, res) => {
  if (req.query.search) {
    Service.findAll({ where: { name: { [Op.like]: `%${req.query.search}%` } } })
      .then((elements) => {
        if (!elements.length) {
          return res.json({ message: "Aucun service ne correspond à votre recherche" })
        }
        const msg = 'La liste des services a bien été récupérée en base de données.'
        res.json({ message: msg, data: elements })
      })
      .catch((error) => {
        const msg = 'Une erreur est survenue.'
        res.status(500).json({ message: msg })
      })
  } else {
    Service.findAll()
      .then((elements) => {
        const msg = 'La liste des services a bien été récupérée en base de données.'
        res.json({ message: msg, data: elements })
      })
      .catch((error) => {
        const msg = 'Une erreur est survenue.'
        res.status(500).json({ message: msg })
      })
  }
}

exports.findServiceById = (req, res) => {
  Service.findByPk(req.params.id, {
    include: Review 
  })
    .then(service => {
      if (service === null) {
        const message = `Le service demandé n'existe pas.`
        res.status(404).json({ message })
      } else {
        const message = "Un service a bien été trouvé."
        res.json({ message, data: service });
      }
    })
    .catch(error => {
      const message = `La liste des services n'a pas pu se charger. Réessayez ultérieurement.`
      res.status(500).json({ message, data: error })
    })
}

exports.updateService = (req, res) => {
  Service.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((result) => {
    const [rowsUpdated] = result;
    if (rowsUpdated === 0) {
      const msg = "Le service demandé n'existe pas."
      res.json({ message: msg })
    } else {
      const msg = "Le service a bien été modifié."
      res.json({ message: msg, data: rowsUpdated })
    }
  }).catch((error) => {
    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error })
    }
    const msg = "Impossible de mettre à jour le service."
    res.status(500).json({ message: msg })
  })
}

exports.deleteService = (req, res) => {
  // Je vérifie si l'utilisateur est authentifié
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
  }

  Service.findByPk(req.params.id)
    .then(service => {
      if (service === null) {
        const message = `Le service demandé n'existe pas.`
        return res.status(404).json({ message });
      }
      return Service.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(() => {
          const message = `Le service ${service.name} a bien été supprimé.`
          res.json({ message, data: service });
        })
        .catch(error => {
          const message = `Impossible de supprimer le service.`
          res.status(500).json({ message, data: error });
        });
    })
    .catch(error => {
      const message = `Une erreur est survenue lors de la recherche du service.`
      res.status(500).json({ message, data: error });
    });
}


exports.createService = (req, res) => {
  let newService = req.body;

  Service.create({
    name: newService.name,
    price: newService.price,
    description: newService.description,
    category_id: newService.category_id,
    category_name: newService.category_name,
  })
    .then((createdService) => {
      const msg = 'Un service a bien été ajouté.'
      res.json({ message: msg, data: createdService })
    })
    .catch(error => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      res.status(500).json({ message: "Une erreur s'est produite lors de la création du service", data: error })
    });
}











