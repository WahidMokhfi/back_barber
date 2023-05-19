module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Service', {
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
      allowNull: false,
      unique: {
        msg: 'La desciption est déjà prise'
      }
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      validate: {
        isPriceValid(value) {
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};




