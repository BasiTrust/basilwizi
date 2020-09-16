const { key, dbUrl, secret } = require('../_few_only/store.json');

process.env.MONGODB_URI = dbUrl;

module.exports = {
  port: 7120,
  session: {
      secret: secret,
      key: key,
      url: dbUrl,
      maxAge: 10800000
  },
  mongodb: process.env.MONGODB_URI, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
}
