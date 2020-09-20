var express = require('express');
var router = express.Router();

// Require the controllers
const home_controller = require('../controllers/homePage');
const userController = require('../controllers/user.controller');
const miscel = require('../controllers/miscel');
const contactController = require('../controllers/contactus.controller');
const blogpost = require('../controllers/blogpost.controller');
const newsController = require('../controllers/news.controller');
const { saveemail } = require('../controllers/subscribe.controller');

/**
 * HOME PAGE REDRECT ROUTE
 */
router.get('/', home_controller.home_get);

/**
 * Login, Register, Edit and Delete Account
 */
// Login get route
router.get('/login', function(req, res){
  res.render('logging/login', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/authenticate', userController.authenticate);

// Register user get route 
router.get('/signup', function(req, res){
  res.render('logging/signup', {title: 'Basilwizi trust - for the People of the great river'})
});
router.post('/register', userController.register); 

/**
 * Subscribers, emails
 */
router.post('/store', saveemail);

/**
 * Blog Post route
 */
router.get('/blogpost', blogpost.getAll);
router.post('/blog', blogpost.makepost);

/**
 * News Articles
 */
router.get('/itm/news', newsController.getAll);
router.get('/itm/writing_pad', (req, res, next) => {
  res.render('itm/news_form', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/makearticle', makearticle);

/**
 * Pages Making the Core of the Application
 */
/* GET users listing. */
router.get('/extensions/community', miscel.com_page);
/* GET users listing. */
router.get('/extensions/about', miscel.ab_t);
/* GET users listing. */
router.get('/extensions/management', miscel.mana_ge);
/* GET users listing. */
router.get('/reports', miscel.rep_orts);

/**
 * Get contactus page and set response setup
 */
router.get('/itm/contactus', function(req, res, next) {
  res.render('itm/contactus', {title: 'Baslwizi- People of the great river' });
});

router.post('/message', contactController.message );

/**
 * Logout from live session
 */
router.get('/logout', (req, res, next) => {
  req.session.logout()
    .then(() => {
      req.session.user = null;
      req.session.destroy();
      res.redirect('/');
      return
    })
    .catch(next);
} );

module.exports = router;