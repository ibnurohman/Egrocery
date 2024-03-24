const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get("/login", Controller.formLogin) // Menampilkan form login
router.post("/login", Controller.login) // Menambahkan data user

module.exports = router;
