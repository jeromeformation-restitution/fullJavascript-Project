const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const Post      = require('./post');


const roleSchema = new mongoose.Schema({
  libelle: String
});

const professionSchema = new mongoose.Schema({
  libelle: String
});

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid!')
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength: 7,
    validate(value){
      if(validator.isEmpty(value)){
        throw new Error('Please enter your password!')
      }else if(validator.equals(value.toLowerCase(),"password")){
        throw new Error('Password is invalid!')
      }else if(validator.contains(value.toLowerCase(), "password")){
        throw new Error('Password should not contain password!')
      }
    }
  },
  tokens:[{
    token:{
      type:String,
    }
  }],
  createdAt:{
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  roles : [roleSchema],
  SIRET: {
    type: Number,
    required: false,
    validate: {
      // On utilise une regex pour tester la valeur du SIRET envoyé
      validator: function(value) {
        return /[0-9]{14}/.test(value);
      },
      message: `le SIRET ne semble pas être un SIRET valide !`
    }
  },
  profession : [professionSchema],
  adresse: {
    type: String,
    required: false,
    trim: true
  },
  ville: {
    type: String,
    required: false,
    trim: true
  },
  slug: {
    type: String,
    unique:true
  },
  tel:{
    type: Number
  },
  imageUser: {
    type: String,
    default: 'user_circle.png'
  },
  isValid: {
    type: Boolean,
    default: true
  }
});
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

UserSchema.statics.checkValidCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if(!user){
    throw new Error('Unable to login 2')
  }
  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch){
    throw new Error('Unable to login 2')
  }
  return user
};

UserSchema.methods.newAuthToken = async function(){
  const user  = this;
  const token =  jwt.sign({_id: user.id.toString() },process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.methods.toJSON = function(){
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

//hash the plain text password before saving
UserSchema.pre('save', async function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next()
});

UserSchema.pre('remove', async function(next){
  const user = this;
  await Post.deleteMany({author: user._id});
  next()
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
