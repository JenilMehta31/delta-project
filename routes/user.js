const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveredirectUrl } = require('../middleware.js');
const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.signUpPage)
    .post(wrapAsync(userController.signUp));

router
    .route("/login")
    .get(userController.loginPage)
    .post(saveredirectUrl,
        passport.authenticate("local", 
        {failureRedirect : "/login", failureFlash: true}),userController.login);

//Logout
router.get("/logout" , userController.logout);

module.exports = router;