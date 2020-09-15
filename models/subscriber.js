//Set up mongoose connection
var Subscriber = require('../middleware/mongo').Subscriber;

module.exports = {
  create: function (subscriber) {
    return Subscriber.create(subscriber)
        //.exec();
  },
  getSubscriberEmail: function (subscriber_email) {
    return Subscriber
      .findOne({ subscriber_email: subscriber_email })
      //.addCreatedAt()
      .exec();
  },
  getSubscriberByDefaultId: function(subscriber_email) {
    return Subscriber
      .findOne({ _id: subscriber_email})
      //.addCreatedAt()
      .exec(); 
  },
  findSubscriber: function(subscriber_email) {
    return Subscriber.find({subscriber_email: subscriber_email}).exec();
  },
  updateSubscriberById: function(admin, subscriberId, data){
    return Subscriber.update({admin: admin, _id: subscriberId}, {$set: data})
      .exec();
  }
}