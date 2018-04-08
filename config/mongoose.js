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

var stripe = require("angularPayments")("pk_test_PUgDq8XdrH18XX0RQV2dfnHR");
