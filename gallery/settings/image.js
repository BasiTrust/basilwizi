var mongoose = require('mongoose');
var { dbUrl } = require('../../_few_only/store.json');

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

exports.Gallery = mongoose.model('Gallery', {
  path: { type: String},
  caption: { type: String }
});

