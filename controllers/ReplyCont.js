const Replys = require('../models/reply');
const moment = require('moment');

var date_reply = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

exports.reply_post = [
  (req, res, next) => {

    var reply = {
      comment_reply: req.fields.comment_reply,
      date_reply: date_reply,
      posted_by: req.fields.posted_by,
      commentId: req.fields.commentId
    }
    try {
      Replys.save(reply) 
        .then(function(result){
          reply = result;
          console.log('success', 'Done!');
          res.redirect('back');
        })
        .catch(function(e){
          if (e) { return next(e); }
          res.redirect('back');
        })
    } catch (error) {
      console.log(error);
    }
  }
]