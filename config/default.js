const { key, dbUrl, secret } = require('../_few_only/store.json');

module.exports = {
  port: 7120,
  session: {
      secret: secret,
      key: key,
      url: dbUrl,
      maxAge: 10800000
  }
}
