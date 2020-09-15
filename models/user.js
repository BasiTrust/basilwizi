var User = require('../middleware/mongo').User;

module.exports = {
  create: function (user) {
    return User
      .create(user)
      //.exec();
  },
  getUserByUsername: function (u_sername) {
    return User
      .findOne({ u_sername: u_sername })
      //.addCreatedAt()
      .exec();
  },
  getUserByDefaultId: function(u_sername) {
    return User
      .findOne({ _id: u_sername})
      //.addCreatedAt()
      .exec(); 
  },
  findUser: function(u_sername) {
    return User
      .find({u_sername: u_sername})
      //.addCreatedAt()
      .exec();
  },
  updateUserById: function(admin, userId, data){
    return User.update({admin: admin, _id: userId}, {$set: data})
      .exec();
  }
}