const { Blogreply } = require('../middleware/mongo');

module.exports = {
  create: function (blogreply) {
    return Blogreply
      .create(blogreply).exec();
  },
  findBlogReply: function(blogreply) {
    return Blogreply
      .find(blogreply).exec();
  },
  getBlogReplyByBlogId: function(blogId) {
    return Blogreply
      .findOne({blogId: blogId}).exec();
  },
  delBlogreplyById: function(blogreplyId, admin) {
    return Blogreply
      .remove({ _id: blogreplyId, admin: admin }).exec();
  }
}