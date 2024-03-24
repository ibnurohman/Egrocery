const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get("/register", Controller.formRegister) // Menampilkan form register
router.post("/register", Controller.addRegister) // Menambahkan data user

module.exports = router;
