var Blogpost = require('../models/blogpost');
var blogReply = require('../models/blog');
var moment = require('moment');

var blog_date = moment(Date.now()).format('MMMM Do, YYYY HH:mm:ss');

exports.blogpost_list = async function (req, res, next) {
  //var admin = req.session.user._id;
  var blogId = req.params.id;
  var replies = [];
  try {
    var blogs = await Blogpost.getAllBlogs(blogId)
    blogs.forEach(async blog => {
      try {
        var br = await blogReply.findBlogReply(blog._id);
        blog.br = br;
        replies = blog.br;
      } catch (error) {
        console.log('error', error);
        res.redirect('back');
      }
    }, this);
    setTimeout(()=>{
      res.render('itm/blogpost', {
        title: 'Basilwizi, People of the great river',
        blogposts: blogs,
        replies: replies
      });
    }, 300);
  } catch (error) {
    console.log('error', error);
    res.redirect('back');
  }
}

// POST
exports.blog_post = [ (req, res, next) => {
  var blogData = {
    bloger_name: req.fields.bloger_name,
    bloger_email: req.fields.bloger_email,
    blog_title: req.fields.blog_title,
    blog_message: req.fields.blog_message,
    blog_date: blog_date
  }

  var blogpost = {
    bloger_name: blogData.bloger_name,
    bloger_email: blogData.bloger_email,
    blog_title: blogData.blog_title,
    blog_message: blogData.blog_message,
    blog_date: blogData.blog_date
  };

  Blogpost.create(blogpost)
    .then(function(result){
      blogpost = result;
      console.log('success', 'Blogpost created')
      req.flash('success', 'Blogpost created');
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

/**
 * EDIT 
 */
exports.blogpost_edit_post = [
  async (req,res,next) => {
    var admin = req.session.blogpost._id;
    var blogpostId = req.params.blogpostId;
    var blogData = {
      bloger_name: req.fields.bloger_name,
      blog_title: req.fields.blog_title,
      blog_message: req.fields.blog_message,
      bloger_email: req.fields.bloger_email
    }
    BlogModel.updateUserById(admin, blogpostId, blogData)
      .then( function(result){
        blogpost = result.ops[0];
        req.flash('success', 'Edited successfully!');
        res.redirect('/');
      })
      .catch(function(e){
        if(e){ 
          req.flash('error', e)
          res.redirect('back');
        } 
        next(e);
      });
  } 
];
