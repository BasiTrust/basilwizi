// varables
const { NewsArticle } = require('../middleware/mongo');

module.exports = {
  perPage,
  count
};

function perPage() {
  var pp = 1;
  return NewsArticle.find({}).skip(0).limit(pp).exec();
}

function count() {
  return NewsArticle.countDocuments({}).exec();
}