const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  contact_name: {type: 'string'},
  contact_email: {type: 'string'},
  contact_message: {type: 'string'}
}, {
  timestamps: true
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Contact', schema);