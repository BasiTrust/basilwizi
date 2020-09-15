var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var UserModel = require('../models/user');
var { roles } = require('../config/role');

// GET /signup
exports.signup_get = function (req, res, next) {
  res.render('logging/signup', {title: 'Signup to Basilwizi Trust'});
};

// POST /signup
exports.signup_post = [ (req, res, next) => {
  var userData = {
    user_fname: req.fields.user_fname,
    user_sname: req.fields.user_sname,
    user_address: req.fields.user_address,
    user_email: req.fields.user_email,
    user_phonenumber: req.fields.user_phonenumber,
    u_sername: req.fields.u_sername,
    gender: req.fields.gender,
    user_bio: req.fields.user_bio,
    user_avatar: req.files.user_avatar.path.split(path.sep).pop(),
    user_passwd: req.fields.user_passwd,
    repassword: req.fields.repassword
  }
  try {
    if (userData.user_passwd !== userData.repassword) {
      throw new Error('Passwords dont match!');
    }
    if ( userData.user_fname === '' ) {
      throw new Error('Required fields are marked with a star');
    }
  } catch (e) {
    fs.unlink(req.files.user_avatar.path);
    console.log('error', 'check the file')
    req.flash('error', e.message);
    return res.redirect('back');
  }

  userData.user_passwd = sha1(userData.user_passwd);

  var user = {
    user_fname: userData.user_fname,
    user_sname: userData.user_sname,
    user_address: userData.user_address,
    user_email: userData.user_email,
    user_phonenumber: userData.user_phonenumber,
    u_sername: userData.u_sername,
    user_passwd: userData.user_passwd,
    gender: userData.gender,
    user_bio: userData.user_bio,
    user_avatar: userData.user_avatar,
    role: 'SuperUser'
  };

  let checkUser = UserModel.getUserByUsername(userData.u_sername);

  if(!checkUser.length) {
    UserModel.create(user)
      .then(function(result){
        user = result;
        delete user.user_passwd;
        //console.log('success', 'account created');
        req.flash('success', 'User added!!!');
        res.redirect('/sites/logging/login');
      })
      .catch(function(e){
        //fs.unlink(req.files.avatar.path);
        if (e.message.match('E11000 duplicate key')) {
          console.log('error', 'duplicate name')  
          //req.flash('error', 'Duplicate username! Try another one');
            return res.redirect('back');
        }
        next(e);
      });
  } else {
    console.log('error', 'name taken, try again');
    //req.flash('error', 'Username already taken. Try another!');
    res.redirect('back');
  }
}];

exports.edit_get = [
  (req, res, next) => {
    var session = req.session;
    session.can('post:save', {userd: 1, ownerId: 1})
      .then(accessGranted => {
        if (accessGranted) {
          return res.render('logging/signup', {title: 'Basiliwzi'});
        }
        res.sendStatus(403)
      })
      .catch(next);
  }
];

/**
 * EDIT USER
 */
exports.user_edit_post = [
  async (req,res,next) => {
    var admin = req.session.user._id;
    var userId = req.params.userId;
    var userData = {
      user_fname: req.fields.user_fname,
      user_sname: req.fields.user_sname,
      user_address: req.fields.user_address,
      user_email: req.fields.user_email,
      user_phonenumber: req.fields.user_phonenumber,
      u_sername: req.fields.u_sername,
      gender: req.fields.gender,
      user_bio: req.fields.user_bio,
      user_avatar: req.files.user_avatar.path.split(path.sep).pop(),
      role: red.params.role || req.fields.role
    }
    UserModel.updateUserById(admin, userId, userData)
      .then( function(result){
        user = result.ops[0];
        req.flash('success', 'Edited successfully!');
        res.redirect('/');
      })
      .catch(function(e){
        if(e){ 
          req.flash('error', e)
          res.redirect('back');
        } 
        next(e);
      });
  } 
];
