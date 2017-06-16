var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');
var nClass = mongoose.model('Class');
var Link = mongoose.model('Link');

module.exports = (function() {
	return{
		user_register: function(req, res){
			console.log("req ",req.body);
			User.findOne({ username:req.body.username }, function(err,user){
				if(user) {
					res.status(401).json({error:'username exists'});
					console.log('route-reg2',user);
				}//ends if
				else {
					console.log("user name not found create new");
					var newUser = User(req.body);
					newUser.save(function(err,data){
						if(err) {
							console.log('Error');
						} else {
							res.json(data);
						}
					});
				}//ends else
			} );//ends UserModel.findOne 
		},
		create_class:function(req,res){
			nClass.findOne({cname:req.body.cname},function(err,course){
				if (course) {
					res.status(401).json({error:'course exists'});
					console.log('route-reg2',course);
				}else{
					var newClass = nClass(req.body);
					newClass.save(function(err,data){
						if (err) {
							console.log("Failed on creating new class");
						}else{
							res.json(data);
							console.log("New class created successfullly");
						}
					})
				}
			})
		},
		upload_link:function(req,res){
			User.findOne({_id:req.body._user},function(err,user){
				if (user) {
					nClass.findOne({_id:req.body._class},function(err,course){
						if (course) {
							nlinkInfo = req.body;
							var newLink = Link(nlinkInfo);
							course.links.push(newLink);
							course.save(function(err,result){
								newLink.save(function(err,data){
									if (err) {
										console.log("Failed on Uploading Link | Save on new link");
									}else{
										res.json(data);
										console.log("Link uploaded successfullly");
									}
								})
							})
						}else{
							console.log("Failed on Uploading Link | class not found");
						}
					})
				}else{
					console.log("Failed on Uploading Link | user not found");
				}
			});
		},
		get_user_by_name:function(req,res){
			User.findOne({ username : req.params.username }, function(err, results){
				if(err){
					res.send(err);
				} 
				else {
					res.json(results);
				}
			});
		},
		get_all_classes:function(req,res){
			nClass.find({}, function(err, results){
				if(err){
					res.send(err);
				} 
				else {
					res.json(results);
				}
			});
		},
		get_all_links_by_class:function(req,res){
			nClass.findOne({_id:req.params.cid}).populate('links').exec(function(err,tclass){
				if (err) {
					console.log("Failed on getting class by id");
				}
				else{
					res.json(tclass)
				}
			});
		},
		get_user: function(req, res){
			User.findOne({ _id : req.params.id }, function(err, results){
				if(err){
					res.send(err);
				} else {
					res.json(results);
				}
			});
		}
	}
})();
