const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  author_fname: { type: 'string' },
  author_lname: { type: 'string' },
  author_email: { type: 'string' },
  author_phone: { type: 'number' },
  news_title : { type: 'string' },
  news_message: { type: 'string' }
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

module.exports = mongoose.model('News', schema);