const { delete_user_post } = require("../users/edituser");

module.exports = {
  canSave: function canSave(req, res, next){
    req.session.can('post:save', {userId: 1, ownerId: 1})
      .then(accessGranted => { 
        if(accessGranted) {
          return
        }
        res.redirect(403, 'back');
      })
      .catch(next);
  },
  canDelete: function canDelete(req, res, next) {
    req.session.can('post:delete', {userId: 1, ownerId: 1})
      .then(accessGranted => {
        if (accessGranted) {
          return;
        }
        res.redirect('back');
      })
      .catch(next);
  }
};