const { dbUrl } = require('../_few_only/store.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || dbUrl, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user.model'),
  Contact: require('../models/contact.model'),
  Blogpost: require('../models/blogpost.model'),
  News: require('../models/news.model'),
  Subscribe: require('../models/subscribe.model'),
  Admin: require('../admin/model/su.model')
};