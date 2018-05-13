let express = require("express"),
    app= express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongo= require("mongodb"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport= require('passport'),
    LocalStrategy = require("passport-local"),
    monoosePlugin= require("passport-local-mongoose"),
    ejs = require("ejs"),
    User = require("./models/users.js"),
  userRoute = require("./routes/user.js");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/VoteApp",function(err, db){
      console.log("Database is connected");
 }, {useMongoClient: true});



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extented: true }));
app.use(express.static(__dirname + '/public/stylesheets/'));
app.use(methodOverride('_method'));

//use passport and set session
app.use(require("express-session")({
  secret: 'Login is necessary',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Get current user
app.use(function(req,res,next){
  res.locals.user= req.user;
  next();
});



//Use of local authentication
passport.use(new LocalStrategy(User.authenticate()));

//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    app.get("/", function(req,res){

        res.render("home");
    });
    app.get("/home", function(req,res){

        res.render("home");
    });
    app.use(userRoute);



    app.listen(8080, function(){
        console.log("Server is up and running");
    });
