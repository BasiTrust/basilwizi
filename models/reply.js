const { Replys } = require('../middleware/mongo');

module.exports = {
  save: function (reply) {
    return Replys
      .create(reply);
  },
  getReply: function () {
    var query = {};
    return Replys
      .find(query).exec();
  },
  delById: function (replyId) {
    return Replys
      .findOne({_id: replyId});
  }
};