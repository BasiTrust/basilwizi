exports.sign_out = [
  (req, res, next) => {
    req.session.logout()
      .then(() => {
        req.session.user = null;
        req.flash('success', 'Call again!');
        res.redirect('/sites/');
        req.session.destroy();
        return
      })
      .catch(next);
  }
];