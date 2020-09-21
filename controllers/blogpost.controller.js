const blogpostService = require('../service/blogpost.service');

module.exports = {
  makepost,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};

/**
 * the main blog uploading code
 */
function makepost(req, res, next) {
  blogpostService.create(req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  blogpostService.getAll()
    .then(blogposts => {
      res.render('itm/blogpost', {
        title: 'Basilwizi trust - Bamulonga',
        blogposts: blogposts
      })
    })
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  blogpostService.getById(req.blogpost.sub)
    .then(blogpost => blogpost ? res.json(blogpost) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  blogpostService.getById(req.params.id)
    .then(blogpost => blogpost ? res.json(blogpost) : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  blogpostService.update(req.params.id, req.fields)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  blogpostService.delete(req.params.id)
    .then(() => res.redirect('back'))
    .catch(err => next(err));
}