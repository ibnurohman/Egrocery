const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get("/order", Controller.listAllOrder) // Menampilkan seluruh order yang tersedia
router.get("/order/:productId", Controller.addOrder) // add product
// router.get("/products/add", Controller.editFormOrder) // Menampilkan form untuk add product
// router.get("/products/add", Controller.editOrder) // edit order

module.exports = router;
