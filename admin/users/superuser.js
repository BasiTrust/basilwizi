const { SU } = require('./model/su');
var sha1 = require('sha1');
const { subscribers, poetry, admins, contactus, users, countComments, countLikes } = require('../pages/lists');
var easySession = require('easy-session');

/**
 * Lists of all users in the system
 */
exports.all_user_get = [
  async (req, res, next)=>{
    try {
      setTimeout(()=>{
        res.render('admin/listpages',
        {
          title: 'Admin page only',
          sessionrole: req.session.getRole()
        })
      },300);
    } catch (error) {
      console.log('error', error);
      res.redirect('back');
    }
  }
];

exports.user_list_get = [
  async (req, res, next) => { 
    try {
      let subslist = await subscribers();
      let userslist = await users();
      let poemslist = await poetry();
      let adminlist = await admins();
      let contactslist = await contactus();
      let num_comments = await countComments({poem_comment: req.params.poem_comment});
      try {
        let role = [];
        if(easySession.checkRole('user')){
          role = 'user';
        } else {
          role = req.sesson.role;
        }
        setTimeout(()=>{
          res.render('admin/userslist', 
          {
            title: 'Admin Page - Lists',
            subslist: subslist,
            poemslist: poemslist,
            adminlist: adminlist,
            contactslist: contactslist,
            userslist: userslist, 
            num_comments: num_comments,
            role: role
          })
        }, 300)
      } catch (error) {
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
      }
    } catch (error) {
      console.log(error);
      req.flash('error', error);
      res.redirect('back');
    }
  } 
];

/**
 * Setting up a new superuser
 */
exports.su_get = [
  (req, res, next)=> {
    res.render('admin/signup', {ttle: 'Admin page' });
  }
];

exports.su_post = [
  (req, res, next)=>{
    SU.findOne({username: req.fields.username}, (err, data)=>{
      if(err){ return next(err) }
      if(data){
        req.flash('error', 'Username already registered. If you forgot password delete the account first');
        res.redirect('/superuser/admin/login');
      } else {
        try {
          var password = req.fields.password
          if(password !== req.fields.repassword){
            console.log('Passwords dont match!');
            res.redirect('back');
          }
          var shardpwd = sha1(req.fields.password);
          var su = new SU ({
            username: req.fields.username,
            password: shardpwd
          })
          su.save((err)=>{
            if(err){ return next(err);}
            delete shardpwd;
            req.flash('success', 'Admin added');
            res.redirect('/superuser/admin/login');
          })
        } catch (error) {
          console.log(error);
          res.redirect('back');
        }
      };
    });
  }
];

/**
 * Login
 */
exports.login_get = [
  (req, res, next)=> {
    res.render('admin/login', {title: 'Admin only'});
  }
];

exports.login_post = [
  (req, res, next) => {
    var password = req.fields.password;
    SU.findOne({username: req.fields.username}, (err, data) => {
      if(err) { return next(err); }
      try {
        if(data.username === req.fields.username && data.password === sha1(password) ){
          delete password;
          req.session.login(req.params.role)
            .then(()=>{
              req.session.user = data;
              if(data.role == 'superuser' ){
                req.session.setRole('superuser');
              }
              if(data.role == 'manager'){
                req.session.setRole('manager');
              }
              if(data.role == 'editor'){
                req.session.setRole('editor');
              }
              if(data.role == 'writer'){
                req.session.setRole('writer');
              }
              if(data.role == 'user'){
                req.session.setRole('user');
              }
              if(data.role == ''){
                req.session.setRole('guest');
              }
              console.log('Success!', 'Logged In!');
              console.log('role: ', req.session.getRole());
              req.flash('success', 'Welcome!');
              res.redirect('/superuser/admin/listpages');
            })
            .catch(e=>{next(e);});
        } else {
          console.log('Error', 'Incorrect Password!');
          res.redirect('back');
        }
      } catch (error) {
        console.log('Error', error);
        req.flash('error', 'Username not found');
        res.redirect('back');
      }
    });
  }
];

/**
 * Logout from admin, but exting admin pages
 */
exports.logout_only = [
  (req, res, next)=>{
    req.session.logout()
      .then(() => { res.redirect('/superuser/admin/login'); })
      .catch(e=>{next(e)});
  }
];

/**
 * Editing personal account
 */
exports.edit_account_get = [
  (req, res, next)=>{
    var userId = req.session.user._id;
    SU.findOne(userId, (data)=>{
      try {
        setTimeout(()=>{
          res.render('admin/personal',
          {
            title: 'Edit admin account',
            user: data
          });
        }, 300);
      } catch (error) {
        console.log(error);
        res.redirect('back');
      }
    });
  }
];

exports.edit_account_post = [
  (req, res, next) => {
    var id = req.params.id;
    SU.findByIdAndUpdate(id, (err)=>{
      if(err){return next(err)}
      else{console.log('success');
      res.redirect('/superuser/admin/login');
    }
    });
  }
];

exports.likes = [
  async (req, res, next) => {
    var likes = await countLikes();
    setTimeout(()=>{
      res.render('admin/likes_count',
      {
        title: 'Statistics',
        likes: likes
      })
    }, 300);
  }
];
