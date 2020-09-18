const { User } = require('../../lib/mongo');

exports.delete_user_post = [
  (req, res, next)=>{
    var id = req.fields.userId;
    User.findById(id, (err, data)=>{
      if(err){ return next(err); }
      else {
        try {
          User.findByIdAndRemove(id, ()=>{
            if(err){return next(err)}else{
              console.log('success');
              req.flash('success', 'User removed');
              res.redirect('listpages');
            }
          });
        } catch (error) {
          console.log(error);
          res.redirect('back');
        }
      }
    });
  }
];


exports.change_role = [
  (req, res, next) => {
    var role = req.fields.role;
    var userId = req.fields.userId;
    User.findOne({_id: req.fields.userId}, (err, data) =>{
      if(err){return next(err);}
      if(!data){
        console.log('Error', 'USer not found');
        res.redirect('back');
      } else {
        var new_role = role;
        data.role = new_role;
        data.save((err, Person) => {
          if(err){ return next(err)}
          else {
            console.log('success', 'Role changed!');
            res.redirect('back');
          }
        })
      }
    });
  }
];