const subscribeService = require('../service/subscribe.service');

module.exports = {
  saveemail,
  getAll,
  getCurrent,
  getById,
  delete: _delete
};

function saveemail(req, res, next) {
  subscribeService.create(req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  subscribeService.getAll()
    .then(subscribes => res.json(subscribes))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  subscribeService.getById(req.subscribe.sub)
    .then(subscribe => subscribe ? res.json(subscribe) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  subscribeService.getById(req.params.id)
    .then(subscribe => subscribe ? res.json(subscribe) : res.sendStatus(404))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  subscribeService.delete(req.params.id)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}