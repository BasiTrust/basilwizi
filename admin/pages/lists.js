const { Subscriber, Poetry, ContactUs, User, Likes } = require("../../lib/mongo");
const { SU } = require("../users/model/su");

module.exports = {
  subscribers: function(){
    return Subscriber
      .find({}).populate({ path: 'SU', model: 'SU'}).sort({ _id: -1 })
      .exec();
  },
  poetry: function(){
    return Poetry
      .find({}).populate({ path: 'SU', model: 'SU' }).sort({ _id: -1 })
      .limit(10).exec();
  },
  products: function(){
    return Products
      .find({}).populate({path:'SU', model: 'SU'}).sort({_id: -1})
      .exec();
  },
  admins: function(){
    return SU
      .find({}).populate({ path: 'SU', model: 'SU' }).sort({ _id: -1 })
      .exec();
  },
  contactus: function(){
    return ContactUs
      .find({}).populate({ path: 'SU', model: 'SU' }).sort({ _id: -1 })
      .exec();
  },
  users: function(){
    return User
      .find({}).populate({ path: 'SU', model: 'SU' }).sort({ _id: -1 })
      .exec();
  },
  countComments: function(poem_comment){
    return Poetry
      .countDocuments({poem_comment: poem_comment}).exec();
  },
  countLikes: function(){
    return Likes
      .countDocuments({}).exec();
  }
}