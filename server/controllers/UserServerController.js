// var mongoose = require('mongoose');
// var User = mongoose.model('User');
// var Card = mongoose.model('Card');
// var nClass = mongoose.model('Class');
// var Link = mongoose.model('Link');
var firebase = require("firebase");

module.exports = (function() {
	return{
		user_register: function(req, res){

			console.log("req ",req.body);
			var email = req.body.email;
			var password = req.body.password;
			var name = req.body.username;

			// User.findOne({ username:req.body.username }, function(err,user){
			// 	if(user) {
			// 		res.status(401).json({error:'username exists'});
			// 		console.log('route-reg2',user);
			// 	}//ends if
			// 	else {
			// 		console.log("user name not found create new");
			// 		var newUser = User(req.body);
			// 		newUser.save(function(err,data){
			// 			if(err) {
			// 				console.log('Error');
			// 			} else {
			// 				res.json(data);
			// 			}
			// 		});
			// 	}//ends else
			// } );//ends UserModel.findOne 
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorCode, errorMessage);
			  // ...
			});
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorCode, errorMessage);
			  // ...
			});
			firebase.auth().onAuthStateChanged(function(currentUser) {
			  	console.log("gg  ",currentUser);
				  if (currentUser) {
				    currentUser.updateProfile({
					  displayName: name
					})
				  }
			});
		},
		user_login:function(req,res){
			console.log("req ",req.body);
			var email = req.body.email;
			var password = req.body.password;
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorCode, errorMessage);
			  // ...
			});
			firebase.auth().onAuthStateChanged(function(currentUser) {
			  	console.log("gg  ",currentUser);
				  if (currentUser) {
				    res.json(currentUser);
				  } else {
				    // No user is signed in.
				  }
			});
		},
		create_class:function(req,res){
			const classRef= firebase.database().ref().child("classes");
			var newClass = classRef.push().then(function(){
				classRef.on('child_added', function(snap) {
    			console.log(snap.getKey(), snap.val());
  				});
			});
		}
	// 	upload_link:function(req,res){
	// 		User.findOne({_id:req.body._user},function(err,user){
	// 			if (user) {
	// 				nClass.findOne({_id:req.body._class},function(err,course){
	// 					if (course) {
	// 						nlinkInfo = req.body;
	// 						var newLink = Link(nlinkInfo);
	// 						course.links.push(newLink);
	// 						course.save(function(err,result){
	// 							newLink.save(function(err,data){
	// 								if (err) {
	// 									console.log("Failed on Uploading Link | Save on new link");
	// 								}else{
	// 									res.json(data);
	// 									console.log("Link uploaded successfullly");
	// 								}
	// 							})
	// 						})
	// 					}else{
	// 						console.log("Failed on Uploading Link | class not found");
	// 					}
	// 				})
	// 			}else{
	// 				console.log("Failed on Uploading Link | user not found");
	// 			}
	// 		});
	// 	},
	// 	get_user_by_name:function(req,res){
	// 		User.findOne({ username : req.params.username }, function(err, results){
	// 			if(err){
	// 				res.send(err);
	// 			} 
	// 			else {
	// 				res.json(results);
	// 			}
	// 		});
	// 	},
	// 	get_all_classes:function(req,res){
	// 		nClass.find({}, function(err, results){
	// 			if(err){
	// 				res.send(err);
	// 			} 
	// 			else {
	// 				res.json(results);
	// 			}
	// 		});
	// 	},
	// 	get_all_links_by_class:function(req,res){
	// 		nClass.findOne({_id:req.params.cid}).populate('links').exec(function(err,tclass){
	// 			if (err) {
	// 				console.log("Failed on getting class by id");
	// 			}
	// 			else{
	// 				res.json(tclass)
	// 			}
	// 		});
	// 	},
	// 	get_user: function(req, res){
	// 		User.findOne({ _id : req.params.id }, function(err, results){
	// 			if(err){
	// 				res.send(err);
	// 			} else {
	// 				res.json(results);
	// 			}
	// 		});
	// 	}
	}
})();
