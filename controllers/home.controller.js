/**
 * Home page controller
 */
const Subscribers = require('../service/subscribe.service');
const Blogs = require('../service/blogpost.service');


module.exports = {
  getAll,
  getCurrent,
  getById
};

async function getAll(req, res, next) {
  try {
    const subscribers = await Subscribers.getAll;
    const blogs = await Blogs.getAll;
    setTimeout(() => {
      res.render('/',
      {
        title: 'Basilwizi Trust - Bamulonga!',
        subscribers: subscribers,
        blogs: blogs
      })
    }, 400)
  } catch (error) {
    console.log(error);
    res.redirect('back')
  }
}

function getCurrent(req, res, next) {
  newsService.getById(req.news.sub)
    .then(news => news ? res.json(news) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  newsService.getById(req.params.id)
    .then(news => news ? res.json(news) : res.sendStatus(404))
    .catch(err => next(err));
}
