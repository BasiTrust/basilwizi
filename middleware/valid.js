exports.newsWriter = [
  (req, res, next) => {
    var session = req.session;
    session.can('post:save', {userd: 1, ownerId: 1})
      .then(accessGranted => {
        if (accessGranted) {
          return
        }
        res.sendStatus(403)
      })
      .catch(next);
  }
];

exports.editorial = [
  (req, res, next) => {
    var session = req.session;
    session.can('post:delete', {userd: 1, ownerId: 1})
      .then(accessGranted => {
        if (accessGranted) {
          return
        }
        res.sendStatus(403)
      })
      .catch(next);
  }
];

exports.super_editor = [
  (req, res, next) => {
    var session = req.session;
    session.can('user:delete', {userd: 1, ownerId: 1})
      .then(accessGranted => {
        if (accessGranted) {
          return 
        }
        res.sendStatus(403)
      })
      .catch(next);
  }
];

exports.canUser = [
  (req, res, next) => {
    var session = req.session;
    session.can('post:save', {userd: 1, ownerId: 1})
      .then(accessGranted => {
        if (accessGranted) {
          return
        }
        res.sendStatus(403)
      })
      .catch(next);
  }
];

exports.guestAccess = [
  (req, res, next) => {
    var session = req.session;
    session.can('read')
      .then(accessGranted => {
        if (accessGranted) {
          return
        }
        res.redirect(403, '/sites')
      })
      .catch(next);
  }
];