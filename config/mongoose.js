// This is our mongoose.js file located in /config/mongoose.js
// This is a config file that connects to MongoDB and loads all of our models for us. We do this here because we don't want to have to connect to the DB every time we require a model!
// require mongoose
// var mongoose = require('mongoose');
// // require file-system so that we can load, read, require all of the model files
// var fs = require('fs');
// // connect to the database Blackbelt
// mongoose.connect('mongodb://localhost/ONE');
// // specify the path to all of the models
// var models_path = __dirname + '/../server/models'
// // read all of the files in the models_path and for each one check if it is a javascript file before requiring it
// fs.readdirSync(models_path).forEach(function(file) {
//   if(file.indexOf('.js') > 0) {
//     require(models_path + '/' + file);
//   }
// })
var firebase = require('firebase')
var config = {
    apiKey: "AIzaSyCSSim3FUwlu9JUBYXpO5ryt84gLfuhRMg",
    authDomain: "project-44788131959256049.firebaseapp.com",
    databaseURL: "https://project-44788131959256049.firebaseio.com",
    projectId: "project-44788131959256049",
    storageBucket: "project-44788131959256049.appspot.com",
    messagingSenderId: "555802028799"
  };
firebase.initializeApp(config);