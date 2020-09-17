/*var Subscribers = require('../middleware/mongo').Subscriber;
var Articles = require('../middleware/mongo').NewsArticle;
var { Blogpost } = require('../middleware/mongo');
var async = require('async');
var moment = require('moment');

/**
 * home page
 *
exports.home_get = function(req, res, next){
  async.parallel({
    subs_count: function (callback) {
      Subscribers.countDocuments({}, callback);
    },
    news_count: function (callback) {
      Articles.countDocuments({}, callback);
    },
    blog_count: function (callback) {
      Blogpost.countDocuments({}, callback);
    }
  },
  function(err, results){
    if(err){ return next(err); }
    req.flash('Welcome : ', req.session.getRole());
    res.render('layouts/index', {  title: 'Basilwizi- People of the great river', error: err, data: results });
  });
};*/

exports.home_get = function(req, res){
  res.render('layouts/index', {  title: 'Basilwizi- People of the great river' })
};