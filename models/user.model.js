const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user_fname: { type: 'string' },
  user_lname: { type: 'string' }, 
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  user_address: { type: 'string' },
  user_email: { type: 'string' },
  user_phonenumber: { type: 'string' },
  u_sername: { type: 'string' },
  hash: { type: 'string' },
  user_avatar: { type: 'string' },
  user_bio: { type: 'string' },
  role: { type: String }
}, {
  timestamps: true
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  }
});

module.exports = mongoose.model('User', schema);