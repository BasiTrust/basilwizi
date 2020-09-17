const newsService = require('../service/news.service');

module.exports = {
  makearticle,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};

function makearticle(req, res, next) {
  newsService.create(req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  newsService.getAll()
    .then(newss => res.json(newss))
    .catch(err => next(err));
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

function update(req, res, next) {
  newsService.update(req.params.id, req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  newsService.delete(req.params.id)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}