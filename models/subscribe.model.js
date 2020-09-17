const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  subscriber_email: { type: 'string' }
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

module.exports = mongoose.model('Subscribe', schema);