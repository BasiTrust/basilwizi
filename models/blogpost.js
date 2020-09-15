//Set up mongoose connection
const { Blogpost } = require('../middleware/mongo');

module.exports = {
  create: function(blogpost) {
    return Blogpost
      .create(blogpost)
      //.exec();
  },
  getAllBlogs: function(){
    return Blogpost
      .find({}).exec();
  },
  getBlogById: function ( blogpostId ) {
    return Blogpost
      .findOne({_id: blogpostId}).exec();
  },
  delBlogpost: function ( blogpostId, admin ) {
    return Blogpost
      .remove({ _id: blogpostId, admin: admin }).exec();
  },
  countDocuments: function(){
    return Blogpost
      .countDocuments({}).exec();
  }
};