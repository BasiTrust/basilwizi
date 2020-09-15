// Suscribers
var SubscriberModel = require('../models/subscriber');

// GET subscribers
exports.subs_get = function (req, res, next) {
  res.render('footer' );
};

// POST subscribers
exports.subs_post = [ (req, res, next) => {
  var subsData = {
    subscriber_email: req.fields.subscriber_email
  }

  var subscriber = {
    subscriber_email: subsData.subscriber_email
  };

  let checkSub = SubscriberModel.findSubscriber(subsData.subscriber_email);

  if(!checkSub.length) {
    SubscriberModel.create(subscriber)
      .then(function(result){
        subscriber = result;
        console.log('success', 'subscribed');
        //req.flash('success', 'You are now subscribed.');
        res.redirect('back');
      })
      .catch(function(e){
        if (e.message.match('E11000 duplicate key')) {
          console.log('error', 'duplicate');
          //req.flash('error', 'Duplicate email! Try another one');
          return res.redirect('back');
        }
        next(e);
      });
  } else {
    console.log('error', 'duplicat');
    req.flash('error', 'Email already exists. Try another!');
    res.redirect('back');
  }
}];
