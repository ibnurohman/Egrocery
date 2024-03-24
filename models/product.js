'use strict';
const {
  Model
} = require('sequelize');
const {Op} = require('sequelize')
const Currency = require('../helpers/helper')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order, { through: models.OrderProduct, foreignKey: "productId" })
    }
    get priceFormat(){
      return Currency(this.price)
    }
    static async searchProducts(name) {
      try {
        let option = {
          order: [['name', 'ASC']],
          where: {}
        };
        if (name) {
          option.where.name = { [Op.iLike]: `%${name}%` };
        }

        const productsData = await Product.findAll(option);
        return productsData;
      } catch (error) {
        throw error;
      }
    }
  }
    Product.init({
      name: {
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg: 'name is required'
          },
        }
  
      },
      description: {
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg: 'description is required'
          },
          // notNull:{
          //   msg: 'description tidak boleh kosong'
          // }
        }
  
      },
      price: {
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg: 'price is required'
          },
          min:{
            args: 1000,
            msg: 'price minimum 1000'
          },
          // notNull:{
          //   msg: 'price tidak boleh kosong'
          // },
        }
  
      },
      picture: {
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg: 'picture is required'
          },
          // notNull: {
          //   msg: "picture tidak boleh kosong"
          // }
        }
  
      },
    }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};