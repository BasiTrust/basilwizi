const suService = require('../service/su.service');

module.exports = {
  authenticate,
  register,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete
};

function authenticate(req, res, next) {
  suService.authenticate(req.fields)
    .then(admin => admin 
      ? req.session.login(req.params.role)
        .then(()=>{
          req.session.admin = admin;
          req.session.setRole(admin.role);
          console.log('Success!', 'Logged In!');
          res.redirect('/superuser/secure');
        })
        .catch(e=>{next(e);})
      : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function register(req, res, next) {
  suService.create(req.fields)
    .then(() => res.redirect('/superuser/admin'))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  suService.getAll()
    .then(admins => res.json(admins))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  suService.getById(req.admin)
    .then(admin => admin 
      ? res.render('admin/personal', {
        title: 'Editing personal data',
        user: admin
      }) 
      : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  suService.getById(req.params.id)
    .then(admin => admin 
      ? res.render('admin/personal', {
        title: admin.username,
        user: admin
      }) 
      : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  suService.update(req.params.id, req.fields)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  suService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}