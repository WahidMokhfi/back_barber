module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris'
      },
      validate: {
        notEmpty: {
          msg: 'Ce champ ne peut pas être vide.'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isPriceValid(value) {
          // Ajoutez ici vos validations personnalisées pour le champ de prix, si nécessaire
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['name'] // Ajoutez cette ligne pour définir l'index unique sur le champ "name"
      }
    ]
  });

  return Service;
};
























