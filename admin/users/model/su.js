var mongoose = require('mongoose');
var { mongodb } = require('../../../config/default')

mongoose.connect(mongodb, {useCreateIndex: true, useFindAndModify: false, useNewUrlParser : true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;

exports.SU = mongoose.model('SU', {
  username: { type: 'string', default: 'superuser'},
  password: { type: 'string', default: 'admin' },
  role: { type: 'string', enum: [ 'superuser', 'editor', 'writer', 'manager', 'user' ], default: 'user' }
});

