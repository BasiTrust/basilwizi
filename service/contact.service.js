const db = require('../db/db');
const Contact = db.Contact;

module.exports = {
  getAll,
  getById,
  create,
  delete: _delete
};

async function getAll() {
  return await Contact.find();
}

async function getById(id) {
  return await Contact.findById(id);
}

async function create(messageParam) {

  const message = new Contact(messageParam);

  // save message
  await message.save();
}

async function _delete(id) {
  await Contact.findByIdAndRemove(id);
}