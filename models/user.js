'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Order, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
      validate: {
        min:{
          args: 10,
          msg: 'password minimum 10'
        },
      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate:(user, opt) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt);
        // console.log(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};