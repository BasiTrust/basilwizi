const config = require('config-lite');
var sha1 = require('sha1');
var UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { default: async } = require('async');

/**
 * Sgn in get
 */
exports.signin_get = [
  (req, res, next) => {
    return res.render('logging/login')
  }
];

/**
 * Signin Post
 */

exports.signin_post = [  (req, res, next) => {
  var u_sername = req.fields.u_sername;
  var user_passwd = req.fields.user_passwd;

  UserModel.getUserByUsername(u_sername)
    .then(function (user) {
      if (!u_sername) {
        req.flash('error', 'User does not exist!');
        return res.redirect('back');
      }
      if (sha1(user_passwd) !== user.user_passwd) {
        req.flash('error', 'Incorect password!');
        return res.redirect('back');
      }
      req.flash('success', 'Signin successful!');
      delete user.user_passwd;
      req.session.login(req.params.role)
        .then(() => {
          req.session.user = user;
          res.redirect('/sites');
        })
        .catch(next);
    })
    .catch(function(e) {
      //req.flash('error', 'Username does not exist!');
      console.log('error', 'Not logged in');
      res.render('error', {error: e});
      //res.redirect('back');
      next(e)
    });
}];

/*
exports.signin_post = () =>  {
          req.session.user = user;
  authenticate,
  getAll,
  getById
};

function authenticate(req, res){
  var u_sername = req.fields.u_sername;
  var user_passwd = req.fields.user_passwd;
  const user = UserModel.findUser(u => {
    u.u_sername === u_sername && u.user_passwd === sha1(user_passwd)
  });
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
};
      req.session.login(req.params.role)
        .then(() => res.redirect('/sites'))
      res.redirect('/sites');

async function getAll(){
  return UserModel.findUser.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function getById (id) {
  const user = UserModel.getUserByDefaultId(u => {
    u.id === parseInt(id);
    if (!user) { return };
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  })
}*/
