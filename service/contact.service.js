const db = require('../db/db');
const Contact = db.Contact;

module.exports = {
  getAll,
  getById,
  create,
  update,
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

async function update(id, messageParam) {
  const message = await Contact.findById(id);

  // validate
  if (!message) throw 'Contact not found';

  // copy messageParam properties to message
  Object.assign(message, messageParam);

  await message.save();
}

async function _delete(id) {
  await Contact.findByIdAndRemove(id);
}