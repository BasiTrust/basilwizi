const Role = require('../config/role');

module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not logged in');
      return res.redirect('/');
    }
    next();
  },
  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('success', 'Has logged');
      return res.redirect('back');
    }
    next();
  },
  checkSuperUser: function checkSuperUser(req, res, next) {
    if (!req.session.user.role.SuperUser) {
      req.flash('failure', 'Only Supr User admin allowed!');
      return res.redrect('back');
    }
    next();
  },
  checkEditor: function (req, res, next) {
    if (req.session.user.role.Edtor) {

    }
  }
};