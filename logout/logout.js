exports.sign_out = [
  (req, res, next) => {
    req.session.logout()
      .then(() => {
        req.session.user = null;
        res.redirect('/');
        req.session.destroy();
        return
      })
      .catch(next);
  }
];