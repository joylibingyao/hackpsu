var users = require('./../server/controllers/UserServerController.js');
  module.exports = function(app) {
    // <----------------| BEGIN || USERS |------------------------->
    app.post('/user_register', function(req, res) {
      console.log("add post in route");
      users.user_register(req, res);
    });

    app.post('/create_class', function(req, res) {
      console.log("add class in route");
      users.create_class(req, res);
    });
    app.post('/upload_link', function(req, res) {
      console.log("add link in route");
      users.upload_link(req, res);
    });
    app.get('/get_all_classes',function(req, res) {
      users.get_all_classes(req, res);
    });
    app.get('/get_all_links_by_class/:cid', function(req, res) {
      users.get_all_links_by_class(req, res);
    });




    app.get('/get_user/:id', function(req, res) {
      users.get_user(req, res);
    });
    app.get('/get_user_by_name/:username', function(req, res) {
      users.get_user_by_name(req, res);
    });
    app.get('/get_global_users',function(req, res) {
      users.get_global_users(req, res);
    });
    app.get('/get_user_selling/:id',function(req,res){
      users.get_user_selling(req,res);
     });
    app.get('/get_user_selling/:id',function(req,res){
      users.get_user_selling(req,res);
     })


  }