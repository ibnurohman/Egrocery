'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product, { through: models.OrderProduct, foreignKey: 'orderId'  })
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    dateOfPurchase: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};