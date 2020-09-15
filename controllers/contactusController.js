var ContactModel = require('../models/contact');

exports.contact_get = function(req, res, next) {
  res.render('itm/contactus', {title: 'Baslwizi- People of the great river' });
};

// POST 
exports.contact_post = [ (req, res, next) => {
  var contactData = {
    contact_name: req.fields.contact_name,
    contact_email: req.fields.contact_email,
    contact_message: req.fields.contact_message
  }

  var contact = {
    contact_name: contactData.contact_name,
    contact_email: contactData.contact_email,
    contact_message: contactData.contact_message
  };

  ContactModel.create(contact)
    .then(function(result){
      contact = result;
      console.log('success', 'Message sent')
      req.flash('success', 'Message sent');
      res.redirect('back');
    })
    .catch(function(e){
      if(e.message){
        console.log('error', e)
        req.flash('error', e);
        res.redirect('back');
      }
      next(e);
    });
}];
