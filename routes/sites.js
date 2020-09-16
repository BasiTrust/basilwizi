var express = require('express');
var router = express.Router();

// Require the controllers
const blog_posts = require('../controllers/blogPost');
var blog_reply = require('../controllers/blogReply');
const contact_us = require('../controllers/contactusController');
const news_con = require('../controllers/newsArticles');
const user_controller = require('../controllers/signup');
const user_login = require('../middleware/login');
const log_out = require('../logout/logout');
const home_controller = require('../controllers/homePage');
const miscel = require('../controllers/miscel');
const subs = require('../controllers/subsController');
const comment_p = require('../controllers/Comments');
const checkIs = require('../middleware/valid');
const rep = require('../controllers/ReplyCont');
const gallery = require('../gallery/gallery');

// Register user get route 
router.get('/logging/signup', user_controller.signup_get);
// Register user post route 
router.post('/logging/signup', user_controller.signup_post);

// Login get route
router.get('/logging/login', user_login.signin_get);
// Login post route with username
router.post('/login',  user_login.signin_post);

/**
 * HOME PAGE REDRECT ROUTE
 */
router.get('/', home_controller.home_get, subs.subs_get);
router.post('/subscribe/create', checkIs.guestAccess, subs.subs_post);

/**
 * Subscribers, emails
 * 
 */
router.post('/subscribe/create', checkIs.guestAccess, subs.subs_post);

// User logout get route
router.get('/logout', log_out.sign_out);



router.get('/itm/blogpost', blog_posts.blogpost_list);
router.post('/blogpost/create', blog_posts.blog_post);
router.post('/itm/blogpost/reply', blog_reply.blog_reply_post);

router.get('/itm/news', news_con.newsarticle_get);
router.get('/itm/news/:page', news_con.newsarticle_get);
router.get('/itm/news_form', news_con.news_create);
router.post('/news', news_con.news_post);

router.post('/itm/news/comment', comment_p.comment_post);
router.post('/itm/news/reply', rep.reply_post);

router.get('/itm/contactus', contact_us.contact_get);
router.post('/itm/contactus', contact_us.contact_post);

/* GET users listing. */
router.get('/extensions/community', miscel.com_page);
/* GET users listing. */
router.get('/extensions/about', miscel.ab_t);
/* GET users listing. */
router.get('/extensions/management', miscel.mana_ge);
/* GET users listing. */
router.get('/reports', miscel.rep_orts);

/* Image Gallery */
router.get('/itm/gallery', gallery.gallery_get);
router.post('/itm/gallery/upload', gallery.gallery_post);


module.exports = router;