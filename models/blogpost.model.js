const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  blogger_name: {type: 'string'},
  blogger_email: {type: 'string'},
  blog_title : { type: 'string' },
  blog_message: { type: 'string' }
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

module.exports = mongoose.model('Blogpost', schema);