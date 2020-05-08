const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const authContoller = require('../controllers/authController');

router.post("/register", authContoller.register );
router.post("/authenticate", authContoller.authenticate );
//router.use(authMiddleware);
router.post("/dashboard", authMiddleware , authContoller.dashboard);

module.exports =  router;