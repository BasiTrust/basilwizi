var express = require('express');
var router = express.Router();

// Require the controllers
const home_controller = require('../controllers/home.controller');
const userController = require('../controllers/user.controller');
const miscel = require('../controllers/miscel');
const contactController = require('../controllers/contactus.controller');
const blogpost = require('../controllers/blogpost.controller');
const newsController = require('../controllers/news.controller');
const { saveemail } = require('../controllers/subscribe.controller');

/**
 * HOME PAGE REDRECT ROUTE
 */
router.get('/', home_controller.getAll);

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
router.post('/archive/:id', blogpost.delete);

/**
 * News Articles
 */
router.get('/news', newsController.getAll);
router.get('/writing_pad', (req, res, next) => {
  res.render('itm/news_form', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/makearticle', newsController.makearticle);

/**
 * Pages Making the Core of the Application
 */
router.get('/community', miscel.com_page);
router.get('/about', miscel.ab_t);
router.get('/management', miscel.mana_ge);
router.get('/reports', miscel.rep_orts);

/**
 * Get contactus page and set response setup
 */
router.get('/contactus', function(req, res, next) {
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