const { Gallery } = require('./image');

module.exports = {
  create: function(photo) {
    return Gallery
      .create(photo)
  },
  getAll: function(){
    return Gallery
      .find({}, ['path', 'caption' ]).sort({_id: -1}).exec()
  },
  getById: function(photoId) {
    return Gallery
      .findOne({ _id: photoId }).exec();
  },
  delPhoto: function(photoId, admin) {
    return Gallery
      .remove({ _id: photoId, admin: admin }).exec();
  }
};