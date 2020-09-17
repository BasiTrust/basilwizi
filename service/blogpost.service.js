const db = require('../db/db');
const Blog = db.Blogpost;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Blog.find();
}

async function getById(id) {
  return await Blog.findById(id);
}

async function create(blogParam) {

  const blog = new Blog(blogParam);

  // save blog
  await blog.save();
}

async function update(id, blogParam) {
  const blog = await Blog.findById(id);

  // validate
  if (!blog) throw 'Blog not found';

  // copy blogParam properties to blog
  Object.assign(blog, blogParam);

  await blog.save();
}

async function _delete(id) {
  await Blog.findByIdAndRemove(id);
}