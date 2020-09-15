var Blogreply = require('../models/blog');
var moment = require('moment');

const blog_reply_date = moment(Date.now()).format('DD-MM-YYYY | HH:mm:ss');

exports.blog_reply_post = [
  (req, res, next) => {
    var blogreply = {
      reply_message: req.fields.reply_message,
      blog_reply_date: blog_reply_date,
      blogId: req.fields.blogId
    }
    Blogreply.create(blogreply)
      .then(function(result){
        blogreply = result;
        console.log('Success', 'Reply to blog done!');
        res.redirect('back');
      })
      .catch(function(e){
        if (e){ return next(e); }
        console.log('error', e);
        res.redirect('back');
      });
  }
];
