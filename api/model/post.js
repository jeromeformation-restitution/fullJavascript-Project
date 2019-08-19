const mongoose = require('mongoose');

const PostSchema  = new mongoose.Schema({
  title:{
    type:String,
    unique:true,
    required: true,
    trim: true
  },
  description:{
    type: String,
    required:true,
    trim: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
