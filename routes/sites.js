var express = require('express');
var router = express.Router();

// Require the controllers
const home_controller = require('../controllers/homePage');
const userController = require('../controllers/user.controller');
const log_out = require('../logout/logout');
const miscel = require('../controllers/miscel');
const contactController = require('../controllers/contactus.controller');
const blogpost = require('../controllers/blogpost.controller');
const { makearticle } = require('../controllers/news.controller');
const { saveemail } = require('../controllers/subscribe.controller');
/*
var blog_reply = require('../controllers/blogReply');
const news_con = require('../controllers/newsArticles');
const comment_p = require('../controllers/Comments');
const checkIs = require('../middleware/valid');
const rep = require('../controllers/ReplyCont');
const gallery = require('../gallery/gallery');*/

/**
 * HOME PAGE REDRECT ROUTE
 */
router.get('/', home_controller.home_get, subs.subs_get);

/**
 * routes for the user
 */
// Login get route
router.get('/logging/login', function(req, res){
  res.render('logging/login', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/authenticate', userController.authenticate);
// Register user get route 
router.get('/logging/signup', function(req, res){
  res.render('logging/signup', {title: 'Basilwizi trust - for the People of the great river'})
});
router.post('/register', userController.register); 
router.get('/', userController.getAll);
router.get('/current', userController.getCurrent);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

// User logout get route
router.get('/logout', log_out.sign_out);

/**
 * Subscribers, emails
 */
router.post('/subscribe/create', saveemail);

/**
 * Blog Post route
 */
router.get('/itm/blogpost', function(req, res, next){
  res.render('itm/blogpost', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/blog', blogpost.makepost);
router.get('/itm/news', function(req, res, next){
  res.render('itm/news', {title: 'Basilwizi trust - Bamulonga'})
});
router.post('/makearticle', makearticle);

/*
router.post('/itm/blogpost/reply', blog_reply.blog_reply_post);

router.get('/itm/news/:page', news_con.newsarticle_get);
router.get('/itm/news_form', news_con.news_create);
router.post('/news', news_con.news_post);

router.post('/itm/news/comment', comment_p.comment_post);
router.post('/itm/news/reply', rep.reply_post);

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

/* Image Gallery *
router.get('/itm/gallery', gallery.gallery_get);
router.post('/itm/gallery/upload', gallery.gallery_post);

/** Music Player *
router.get('/itm/songs', track_get);
router.post('/itm/songs/upload', track_post);*/

module.exports = router;