const { NewsArticle } = require('../middleware/mongo');
const Comments = require('../models/comment');
const News = require('../models/news');
const { default: async } = require('async');
const { perPage, count } = require('../controllers/pagination');
var Reply = require('../models/reply');
var moment = require('moment');
var { roles } = require('../config/role');

let news_pub_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

// Display list of all Articles.
exports.newsarticle_get = async function(req, res, next) {
  var user = req.query.user;
  var newsarticleId = req.params._id;
  var commentId = req.params.commentId;
  var page = req.params.page || 1;
  var eachRole = req.session.getRole();
  try {
    var articles = await News.getArticles(user);
    var results = [];
    var replies = [];
    articles.forEach(async article => {
      try {
        var comments = await Comments.getComments(article._id);
        article.comments = comments;
        results = article.comments;
        comments.forEach(async comment => {
          try {
            var reply = await Reply.getReply(comment._id);
            comment.reply = reply;
            replies = comment.reply;
          } catch (error) {
            console.log(error);
            res.redirect('back');
          }
        });
      } catch (error) {
        console.log(error);
        res.redirect('back');
      }
    }, this);
    setTimeout(() => {
      res.render('itm/news', {
        title: 'Basilwizi- people of the great river', 
        articles: articles,
        current_page: page,
        pages: Math.ceil(count / perPage),
        comments: results,
        postId: newsarticleId,
        replies: replies,
        commentId: commentId,
        role: eachRole
      });
    }, 300)
  } catch (error) {
    console.log('error', error);
    res.redirect('back');
  }
};

exports.news_create = function(req, res) {
  res.render('itm/news_form', {title: 'Basilwizi- people of the great river'});
};

// POST 
exports.news_post = [ (req, res, next) => {
  var newsData = {
    author_fname: req.fields.author_fname,
    author_lname: req.fields.author_lname,
    author_phone: req.fields.author_phone,
    author_email: req.fields.author_email,
    news_title: req.fields.news_title,
    news_message: req.fields.news_message
  }

  var newsarticle = {
    author_fname: newsData.author_fname,
    author_lname: newsData.author_lname,
    author_phone: newsData.author_phone,
    author_email: newsData.author_email,
    news_title: newsData.news_title,
    news_message: newsData.news_message,
    news_pub_date: news_pub_date
  };

  try {
    NewsArticle.create(newsarticle)
      .then(function(result){
        newsarticle = result;
        console.log('success', 'news created');
        req.flash('success', 'News added!!!');
        res.redirect('back');
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
  } catch (error) {
    console.log('error', error);
    //req.flash('error', 'Newsname already taken. Try another!');
    res.redirect('back');
  }
}];

/**
 * EDIT 
 */
exports.newsarticle_edit_post = [
  async (req,res,next) => {
    var admin = req.session.newsarticle._id;
    var newsarticleId = req.params.newsarticleId;
    var newsData = {
      author_fname: req.fields.author_fname,
      author_lname: req.fields.author_lname,
      author_phone: req.fields.author_phone,
      author_email: req.fields.author_email,
      news_title: req.fields.news_title,
      news_message: req.fields.news_message
    }
    NewsModel.updateNewsById(admin, newsarticleId, newsData)
      .then( function(result){
        newsarticle = result.ops[0];
        req.flash('success', 'Edited successfully!');
        res.redirect('back');
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
