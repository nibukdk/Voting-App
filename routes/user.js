var express = require('express'),
    router = express.Router(),
    User = require("../models/users.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");


  router.get("/", function(req,res){

      res.render("home");
  });

  router.get("/home", function(req,res){

      res.render("home");
  });

//Register and Login
router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/", function(req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, result) {
    if (err) {
      return res.redirect("back");
      console.log(err);
    }
    passport.authenticate('local')(req, res, function() {
      res.render("home");
    });
  });
});

//Login
router.get("/login", function(req, res) {
  res.render("login");
});

let loginMiddleware = passport.authenticate("local", {
    successRedirect: '/home',
    failureRedirect: '/login'
  });
router.post("/login",loginMiddleware, function(req,res){

});

router.get("/logout", function(req, res){
     req.logout();
     res.redirect("/");
   });

   function isLoggedInMiddleWare(req, res, next){
     if(req.isAuthenticated()){
       return next();
     }

       res.redirect("/login");

   }




module.exports = router;
