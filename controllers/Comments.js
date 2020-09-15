const Comments =  require('../models/comment');

exports.comment_post = [ (req, res, next) => {
  var commData = {
    comment_name: req.fields.comment_name,
    comment_message: req.fields.comment_message,
    author_phone: req.fields.author_phone,
    comment_email: req.fields.comment_email,
    postId: req.fields.postId,
    date_posted: req.fields.date_posted
  }

  var comment = {
    comment_name: commData.comment_name,
    comment_message: commData.comment_message,
    author_phone: commData.author_phone,
    comment_email: commData.comment_email,
    postId: commData.postId,
    date_posted: commData.date_posted
  };

  Comments.create(comment)
    .then(function(result) {
      comment = result;
      console.log('success', 'comment created');
      res.redirect('back');
    })
    .catch(function(e){
      console.log('error', e);
      res.redirect('back');
      next(e);
    })
}];
