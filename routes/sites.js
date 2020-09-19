var express = require('express');
var router = express.Router();

// Require the controllers
const home_controller = require('../controllers/homePage');
const userController = require('../controllers/user.controller');
const miscel = require('../controllers/miscel');
const contactController = require('../controllers/contactus.controller');
const blogpost = require('../controllers/blogpost.controller');
const { makearticle } = require('../controllers/news.controller');
const { saveemail } = require('../controllers/subscribe.controller');
const { getAll } = require('../controllers/blogpost.controller');

/**
 * HOME PAGE REDRECT ROUTE
 */
router.get('/', home_controller.home_get);

/**
 * routes for the user
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
router.get('/', userController.getAll);
router.get('/current', userController.getCurrent);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


/**
 * Subscribers, emails
 */
router.post('/subscribe/create', saveemail);

/**
 * Blog Post route
 */
router.get('/blogpost', getAll);
router.post('/blog', blogpost.makepost);
router.get('/itm/news', function(req, res, next){
  res.render('itm/news', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/makearticle', makearticle);


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
      res.redirect('/');
      req.session.destroy();
      return
    })
    .catch(next);
} );

module.exports = router;