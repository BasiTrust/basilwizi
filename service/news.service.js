const db = require('../db/db');
const News = db.News;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await News.find();
}

async function getById(id) {
  return await News.findById(id);
}

async function create(articleParam) {

  const article = new News(articleParam);

  // save article
  await article.save();
}

async function update(id, articleParam) {
  const article = await News.findById(id);

  // validate
  if (!article) throw 'News not found';

  // copy articleParam properties to article
  Object.assign(article, articleParam);

  await article.save();
}

async function _delete(id) {
  await News.findByIdAndRemove(id);
}