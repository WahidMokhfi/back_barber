let coworkings = require('../mock-services');
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { ServiceModel, ReviewModel, sequelize } = require('../db/sequelize')


exports.findAllServices = (req, res) => {
    if(req.query.search){
        // notre recherche avec paramètres
        ServiceModel.findAll({ where: { name: {[Op.like] : `%${req.query.search}%`} } })
        .then((elements)=>{
            if(!elements.length){
                return res.json({message: "Aucun service ne correspond à votre recherche"})    
            }
            const msg = 'La liste des services a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    } else {
        ServiceModel.findAll()
        .then((elements)=>{
            const msg = 'La liste des services a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    }
}

exports.findServiceByPk = (req, res) => {
    // Afficher le service correspondant à l'id en params, en le récupérant dans la bdd findByPk()
    ServiceModel.findByPk(req.params.id, {
        include: ReviewModel
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
            const message = `La liste des services n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}

exports.findAllServicesByReview = (req, res) => {
    const minRate = req.query.minRate || 4
    ServiceModel.findAll({
        include: {
            model: ReviewModel,
            where: {
                rating: { [Op.gte]: 4 }
            }
        }
    })
    .then((elements)=>{
        const msg = 'La liste des services a bien été récupérée en base de données.'
        res.json({message: msg, data: elements})
    })
    .catch((error) => {
        const msg = 'Une erreur est survenue.'
        res.status(500).json({message: msg})
    })
}

exports.findAllServicesByReviewSQL = (req, res) => {
    return sequelize.query('SELECT name, rating FROM `services` LEFT JOIN `reviews` ON `services`.`id` = `reviews`.`serviceId`',
        {
            type: QueryTypes.SELECT
        }
    )
        .then(services => {
            const message = `Il y a ${services.length} services comme résultat de la requête en SQL pur.`
            res.json({ message, data: services })
        })
        .catch(error => {
            const message = `La liste des services n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}

exports.updateService = (req, res) => {
    // Modifier le service en base de données qui correspond à l'id spécifé dans les params
    ServiceModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((service) => {
        if(service === null){
            const msg = "Le service demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le service a bien été modifié."
            res.json({message: msg, data: service})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le service."
        res.status(500).json({message: msg})
    })
}

exports.deleteService = (req, res) => {
    ServiceModel.findByPk(req.params.id)
        .then(service => {
            if (service === null) {
                const message = `Le service demandé n'existe pas.`
                return res.status(404).json({ message })
            }
            return ServiceModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le service ${service.name} a bien été supprimé.`
                    res.json({ message, data: service });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer le service.`
            res.status(500).json({ message, data: error })
        })
}

exports.createService = (req, res) => {
    let newService = req.body;

    ServiceModel.create({
        name: newService.name,
        price: newService.price,
        description: newService.description,
    }).then((el) => {
        const msg = 'Un service a bien été ajouté.'
        res.json({ message: msg, data: el })
    }).catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        res.status(500).json(error)
    })
}
