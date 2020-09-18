const config = require('../../_few_only/store.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../db/db');
const Admin = db.Admin;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  const admin = await Admin.findOne({ username });
  if (admin && bcrypt.compareSync(password, admin.hash)) {
    const token = jwt.sign({ sub: admin.id }, config.secret);
    return {
      ...admin.toJSON(),
      token
    };
  }
}

async function getAll() {
  return await Admin.find();
}

async function getById(id) {
  return await Admin.findById(id);
}

async function create(adminParam) {
  // validate
  if (await Admin.findOne({ username: adminParam.username })) {
    throw 'Username "' + adminParam.username + '" is already taken';
  } 

  const admin = new Admin(adminParam);

  // first registered account is a superuser
  const isFirstAccount = (await Admin.countDocuments({})) === 0;
  admin.role = isFirstAccount ? 'SuperUser' : 'User';

  // hash password
  if (adminParam.password) {
    admin.hash = bcrypt.hashSync(adminParam.password, 10);
  }

  // save admin
  await admin.save();
}

async function update(id, adminParam) {
  const admin = await Admin.findById(id);

  // validate
  if (!admin) throw 'Admin not found';
  if (admin.username !== adminParam.username && await Admin.findOne({ username: adminParam.username })) {
      throw 'Adminname "' + adminParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (adminParam.password) {
      adminParam.password = bcrypt.hashSync(adminParam.password, 10);
  }

  // copy adminParam properties to admin
  Object.assign(admin, adminParam);

  await admin.save();
}

async function _delete(id) {
  await Admin.findByIdAndRemove(id);
}