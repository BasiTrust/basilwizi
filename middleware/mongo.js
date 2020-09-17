/*var mongoose = require('mongoose');
var db = require('../config/default');

mongoose.connect(db.mongodb, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;


exports.User = mongoose.model('User', {
  user_fname: { type: 'string' },
  user_sname: { type: 'string' }, 
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  user_address: { type: 'string' },
  user_email: { type: 'string' },
  user_phonenumber: { type: 'string' },
  u_sername: { type: 'string' },
  user_passwd: { type: 'string' },
  user_avatar: { type: 'string' },
  user_bio: { type: 'string' },
  date_joined: { type: 'string' },
  role: { type: String, enum: [ 'SuperUser', 'Editor', 'Writer', 'User' ], default: 'User' }
});

/*exports.User.index({ id: 1 }, { unique: true }).exec();
  role: { type: 'string', enum: [ roles.roles.Editor = 'Editor', roles.roles.SuperUser = 'SuperUser', roles.roles.Writer = 'Writer', roles.roles.User 'User', roles.roles.Guest = 'Guest' ], default: roles.roles.User = 'User'} 
*


exports.Blogpost = mongoose.model('Blogpost', {
  bloger_name: {type: 'string'},
  blog_title : { type: 'string' },
  blog_message: { type: 'string' },
  blog_date: { type: 'string' }
});
exports.Blogreply = mongoose.model('Blogreply', {
  reply_message: { type: String },
  blog_reply_date: { type: Date },
  blogId: { type: 'string' }
});

/*
exports.Blogpost.index({ _id: -1}).exec();
*

exports.Subscriber = mongoose.model('Subscriber', {
  subscriber_email: { type: 'string' }
});
//exports.Subscriber.index({id:1}, {unique: true}).exec();

exports.NewsArticle = mongoose.model('NewsArticle', {
  author_fname: { type: 'string' },
  author_lname: { type: 'string' },
  author_email: { type: 'string' },
  author_phone: { type: 'number' },
  news_title : { type: 'string' },
  news_message: { type: 'string' },
  news_pub_date: { type: 'string' }
});
//exports.NewsArticle.index({ _id : -1 }).exec();

exports.Comments = mongoose.model('Comments', {
  comment_name: {type: String},
  comment_message: {type: String},
  comment_email: { type: String },
  date_posted: {type: Date},
  postId: {type: String}
});
//exports.Comments.index({ _id: -1 }).exec();

exports.Replys = mongoose.model('Reply', {
  comment_reply: { type: 'string' },
  posted_by: { type: 'string' },
  date_reply: { type: 'string' },
  commentId: { type: 'string' }
})

exports.ContactUs = mongoose.model('ContactUs', {
  contact_name: {type: 'string'},
  contact_email: {type: 'string'},
  contact_message: {type: 'string'}
});
//exports.ContactUs.index({ _id: -1 }).exec();*/