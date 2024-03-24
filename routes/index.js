const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get("/", Controller.home) // Menampilkan home eGrocery (dengan tombol register & submit)
router.use(require("./register"));
router.use(require("./login"));
router.use((req,res,next) => {
    console.log(req.session.user)
    if(req.session.user){
        next()
    }else {
        res.redirect('/login')
    }
})
router.use(require("./products"))
router.use(require("./orders"))
// router.use(require("./"))



module.exports = router;