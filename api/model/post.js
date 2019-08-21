const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  libelle: String
});
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
    ref:'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  categories: [categorySchema],
  imagePost:{
    type: String,
    default: 'posts.png'
  },
  slug: {
    type: String,
    unique:true
  }
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
