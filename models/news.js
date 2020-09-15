const { NewsArticle } = require('../middleware/mongo');

module.exports = {
  create: function (newsarticle) {
    return NewsArticle
      .create(newsarticle)
      .exec();
  },
  getArticles: function (user) {
    var query = {};
    if (user) {
        query.user = user;
    }
    return NewsArticle
      .find(query)
      .populate({path: 'User', model: 'User'})
      .sort([['news_date_pub', 'descending']])
      .exec()
  },
  counter: function () {
    return NewsArticle
      .countDocuments({}).exec()
  },
  findById: function (newsarticleId) {
    return NewsArticle
      .findOne({newsarticleId: newsarticleId})
      .exec()
  },
  searchArticle: function (data) {
    var queryData = new RegExp(data.trim());
    return NewsArticle
      .find({
        '$or': [{
          author_fname: queryData
        }, {
          author_lname: queryData
        }, {
          news_title: queryData
        }, {
          news_message: queryData
        }]
      })
      .sort({ _id: -1 })
      .exec();
  },
  delArticleById: function (newsarticleId, admin) {
      return NewsArticle.remove({ admin: admin, _id: newsarticleId }).exec();
  },
  updateById: function(admin, newsarticleId, data){
    return NewsArticle.update({admin: admin, _id: newsarticleId}, {$set: data})
      .exec();
  }
};