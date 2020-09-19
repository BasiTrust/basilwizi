const db = require('../db/db');
const Subscribe = db.Subscribe;

module.exports = {
  getAll,
  getById,
  create,
  delete: _delete
};

async function getAll() {
  return await Subscribe.find();
}

async function getById(id) {
  return await Subscribe.findById(id);
}

async function create(emailParam) {
  // validate
  if (await Subscribe.findOne({ email: emailParam.email }) ) {
    throw 'This email "' + emailParam + '" is already subscribed';
  }

  const email = new Subscribe(emailParam);

  // save email
  await email.save();
}

async function _delete(id) {
  await Subscribe.findByIdAndRemove(id);
}