/**
 * Home page controller
 */
const async = require('async');
const { Subscribe, Blogpost } = require('../db/db');

module.exports = {
  getAll
};

async function getAll(req, res, next) {
  try {
    async.parallel({
      subs : function(callback){
        Subscribe.countDocuments({}, callback)
      },
      blogs: function (callback) {
        Blogpost.countDocuments({}, callback)
      }
    },
    (err, results) => {
      if(err){return next(err)}
      setTimeout(() => {
        res.render('layouts/index',
        {
          title: 'Basilwizi Trust - Bamulonga!',
          data: results
        })
      }, 400)
    })
  } catch (error) {
    console.log(error);
    res.redirect('back')
  }
}
