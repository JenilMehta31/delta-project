const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const passport = require("passport");

module.exports.signUpPage = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req,res) => {
    try {
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) =>  {
            if(err) {
                return next(err);
            }
            req.flash("success" , "Welcome to WanderLust ");
            return res.redirect("/listings");
        });
        console.log(registeredUser);
        // req.flash("success" , "New user registered successfully");
        // res.redirect("/listings");
    } catch(error) {
        req.flash("error" , error.message);
        res.redirect("/signup");
    }
    
};

module.exports.loginPage = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req,res) => {
    req.flash("success" , "Welcome to WanderLust! You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) =>  {
        if(err) {
            next(err);
        }
        req.flash("success" , "You are logged out.");
        res.redirect("/listings");
    })
};

