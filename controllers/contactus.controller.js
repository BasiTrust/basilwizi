const contactService = require('../service/contact.service');

module.exports = {
  message,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};

function message(req, res, next) {
  contactService.create(req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  contactService.getAll()
    .then(contacts => res.json(contacts))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  contactService.getById(req.contact.sub)
    .then(contact => contact ? res.json(contact) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  contactService.getById(req.params.id)
    .then(contact => contact ? res.json(contact) : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  contactService.update(req.params.id, req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  contactService.delete(req.params.id)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}