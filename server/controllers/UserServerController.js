//post request-info stored in req.body
//get request - info stored in req.paramas
var firebase = require("firebase");
const dbRef= firebase.database().ref()

module.exports = (function() {
	return{
		user_register: function(req, res){

			// console.log("req ",req.body);
			var email = req.body.email;
			var password = req.body.password;
			var name = req.body.username;
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
			  	// console.log("gg  ",currentUser);
				  if (currentUser) {
				    currentUser.updateProfile({
					  displayName: name
					})
				  }
			});
		},
		user_login:function(req,res){
			// console.log("req ",req.body);
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
			  	// console.log("gg  ",currentUser);
				  if (currentUser) {
				    res.json(currentUser);
				  } else {
				    // No user is signed in.
				  }
			});
		},
		create_class:function(req,res){
			const classRef= firebase.database().ref().child("classes");
			var newClass = classRef.push();
			var key = newClass.key
			var newClassInfo={
				id:key,
				cname:req.body.cname,
				links:{},
				linkCount:0
			}
			newClass.set(newClassInfo);
			console.log("create classes succ");
			res.json(req.body.cname);

		},
		// get_all_classes:function(req,res){
		// 	dbRef.on("value", function(snapshot) {
		// 	    snapshot.forEach(function (childSnapshot) {
		//             var value = childSnapshot.val();
		//             res.json(value)
		//         });
		// 	});
		// },
		get_class_by_name:function(req,res){
			console.log("req body into ",req.params.cname);
			dbRef.child('classes').orderByChild('cname').equalTo(req.params.cname).on("value", function(snapshot) {
			    // console.log("snap val+ ",snapshot.val());
			    snapshot.forEach(function (childSnapshot) {
		            var value = childSnapshot.val();
		            res.json(value)
		        });
			});
		},
		upload_link:function(req,res){
			const linkRef= dbRef.child("links");
			var nlink = linkRef.push();
			var key = nlink.key
			var nLinkInfo={
				id:key,
				url:req.body.url,
				message:req.body.message,
				cname:req.body.cname,
				_class:req.body._class,
				username:req.body.username,
				_user:req.body._user,
			}
			nlink.set(nLinkInfo)
			.then(dbRef.child('classes/'+req.body._class).child("links").push().set({
				id:key
			}));
			console.log("create link succ");
			res.json(req.body.cname);
		},
		get_all_links_by_class:function(req,res){
			dbRef.child('links')
			.orderByChild("_class")
			.equalTo(req.params.cid)
			.once("value",function(snapshot){//retrive data only once
				res.json(snapshot.val());
			});
		},
		get_all_classes:function(req,res){
			dbRef.child("classes").orderByKey().once("value",function(snapshot){
				res.json(snapshot.val());
			});
		},

  ////------------- PAYMENT ---------- ///////
		charge:function(req,res){
			console.log(req.body);
			var token = req.body.token.id; // Using Express
			var amount = 1;
// Charge the user's card:
			Stripe.charges.create({
  			amount: amount,
  			currency: "usd",
  			description: "Example charge",
  			source: token,
			}, function(err, charge) {
  			// asynchronously called
				if (error) {
					console.log(err);
				}else{
					console.log(charge);
				}
			});
		}
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
