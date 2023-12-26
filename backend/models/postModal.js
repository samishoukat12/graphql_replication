const mongoose = require('mongoose');

const PostModel = mongoose.model('Post', {
    title: String,
    content: String,
  });
  

  module.exports={
    PostModel
  }