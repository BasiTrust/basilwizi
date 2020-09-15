const { Comments } = require('../middleware/mongo');

module.exports = {
  create: function (comment) {
    return Comments.create(comment)
        //.exec();
  },
  getCommentsName: function (comment_name) {
    return Comments
      .findOne({ comment_name: comment_name })
      //.addCreatedAt()
      .exec();
  },
  getComments: function () {
    var query = {};
    return Comments.find(query).exec();
  },
  findById: function(commentId) {
    return Comments
      .findOne({ _id: commentId})
      //.addCreatedAt() 
      .exec(); 
  },
  findComments: function(comment_message) {
    return Comments.find({comment_message: comment_message}).exec();
  },
  updateCommentsById: function(admin, commentId, data){
    return Comments.update({admin: admin, _id: commentId}, {$set: data})
      .exec();
  }
}