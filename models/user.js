const userRoles = ['user', 'admin',];

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom d'utilisateur est déjà pris."
      },
      validate: {
        notEmpty: {
          msg: "Ce champ ne peut pas être vide."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roles: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      set(roles) {
        if (Array.isArray(roles)) {
          this.setDataValue('roles', roles.join());
        } else {
          this.setDataValue('roles', roles);
        }
      },
      get() {
        const roles = this.getDataValue('roles');
        if (roles) {
          return roles.split(',');
        }
        return [];
      },
      validate: {
        areRolesValid(roles) {
          if (!roles || roles.length === 0) {
            throw new Error("Un utilisateur doit avoir au moins un rôle");
          }
          const rolesArray = roles.split(',').map(role => role.trim()); // Trim each role
          rolesArray.forEach(role => {
            if (!userRoles.includes(role)) {
              throw new Error(`Les rôles d'un utilisateur doivent appartenir à la liste suivante : ${userRoles}`);
            }
          });
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "L'adresse e-mail est déjà utilisée."
      },
      validate: {
        isEmail: {
          msg: "L'adresse e-mail est invalide."
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Le numéro de téléphone doit être composé de chiffres uniquement."
        }
      }
    }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'user_id',
      allowNull: false
    });
  };

  return User;
};
































































