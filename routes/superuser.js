var express = require('express');
var router = express.Router();
const { authenticate, register, update, getCurrent, getById, delete: _delete } = require('../admin/controllers/su.controller');
const { getAll } = require('../controllers/user.controller');

/**
 * Get admin landing page. No unauthorised entry
 */
router.get('/admin', function(req, res){
  res.render('admin/login', {title: 'Administrative Basilwizi'})
});
router.post('/authenticate', authenticate );

/**
 * Logged in page admin
 */
router.get('/secure', function(req, res){
  res.render('admin/listpages', {title: 'Administrator Page!!!'});
});

/**
 * Create a superuser account
 */
router.get('/admin/signup', function(req, res){
  res.render('admin/signup', {title: 'Administrative Basilwizi'});
});
router.post('/register', register );
router.get('/:id', getById);
router.put('/:id', update );
router.delete('/:id', _delete );

/**
 * Logout from live session
 */
router.get('/logout', (req, res, next) => {
  req.session.logout()
    .then(() => {
      req.session.admin = null;
      res.redirect('/superuser/admin');
      req.session.destroy();
      return
    })
    .catch(next);
} );

/**
 * Fetch all user accounts from Basilwizi site
 */
router.get('/accounts', getAll );

module.exports = router;