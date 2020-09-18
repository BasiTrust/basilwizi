const config = require('../_few_only/store.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/db');
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ u_sername, user_passwd }) {
  const user = await User.findOne({ u_sername });
  if (user && bcrypt.compareSync(user_passwd, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...user.toJSON(),
      token
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  // validate
  if (await User.findOne({ user_email: userParam.user_email })) {
    throw 'Email "' + userParam.user_email + '" is already taken';
  }
  if (await User.findOne({ u_sername: userParam.u_sername })) {
    throw 'Username "' + userParam.u_sername + '" is already taken';
  }

  const user = new User(userParam);

  // first registered account is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  user.role = isFirstAccount ? 'SuperUser' : 'User';

  // hash password
  if (userParam.user_passwd) {
    user.hash = bcrypt.hashSync(userParam.user_passwd, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.user_email !== userParam.user_email && await User.findOne({ user_email: userParam.user_email })) {
      throw 'Username "' + userParam.user_email + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.user_passwd) {
      userParam.user_passwd = bcrypt.hashSync(userParam.user_passwd, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}