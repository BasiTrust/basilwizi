//Set up mongoose connection
var ContactUs = require('../middleware/mongo').ContactUs;

module.exports = {
  create: function (contact) {
    return ContactUs.create(contact)
    //.exec();
  },
  getContactUsByContactUsName: function (contact_name) {
    return ContactUs
      .findOne({ contact_name: contact_name })
      //.addCreatedAt()
      .exec();
  },
  getContactUsByContactUsEmail: function (contact_email) {
    return ContactUs
      .findOne({ contact_email: contact_email })
      //.addCreatedAt()
      .exec();
  },
  getContactUsByDefaultId: function(contact) {
    return ContactUs
      .findOne({ _id: contact})
      //.addCreatedAt()
      .exec(); 
  },
  findContactUs: function(contact) {
    return ContactUs
      .find({contact: contact})
      .exec();
  },
  updateContactUsById: function(admin, contactId, data){
    return ContactUs.update({admin: admin, _id: contactId}, {$set: data})
      .exec();
  }
}