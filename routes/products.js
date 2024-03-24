const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get("/products", Controller.listAllProducts) // Menampilkan seluruh Product yang tersedia
router.get("/products/add", Controller.formAddProduct) // Menampilkan form untuk add product
router.post("/products/add", Controller.addProduct) // add product
router.get("/products/logout", Controller.getLogout) // Menampilkan form untuk mengedit product
router.get("/products/edit/:productId", Controller.formEditProduct) // Menampilkan form untuk mengedit product
router.post("/products/edit/:productId", Controller.editProduct) // edit product
router.get("/products/delete/:productId", Controller.deleteProduct) // Menampilkan form untuk mengedit product






module.exports = router;