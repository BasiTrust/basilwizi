const { key, dbUrl, secret } = require('../_few_only/store.json');

process.env.MONGODB_URI = dbUrl;

module.exports = {
  port: 5540,
  session: {
      secret: secret,
      key: key,
      maxAge: 10800000
  },
  mongodb: process.env.MONGODB_URI, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
}
