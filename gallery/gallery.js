var { upload } = require('./settings/uploader');
const Gallery = require('./settings/middle');
const gl = require('./settings/image');

/* GET home page. */
exports.gallery_get = [
  (req,res, next) => {
    var user = req.query.user;
    try {
      var photos = Gallery.getAll();
      setTimeout(() => {
        res.render('itm/gallery', {
          title: 'Basilwizi - Images Gallery!',
          msg: req.query.msg,
          gallery_list: photos
        });
      }, 300)
    } catch (error) {
      console.log('error', error);
      res.redirect('back');
    }
  }
];

/** Upload file to path and add record to database */
exports.gallery_post = [
  (req, res, next) => {
    upload(req, res, (error) => {
      if (error) { res.redirect('/sites/itm/gallery/?msg=3'); }
      else {
        var fullPath = `/sites/itm/gallery/${req.fields}`;
        var photo = {
          path: fullPath,
          caption: req.body.caption
        };
        Gallery.create(photo)
          .then(function(result){
            photo = result;
            console.log('Success', 'Image Uploaded!');
            res.redirect('back');
          })
          .catch(function(e){
            console.log(e);
            res.redirect('back');
            next(e);
          });
      }
    })
  }
];
