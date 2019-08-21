const mongoose = require('mongoose');

const attachementsSchema = new mongoose.Schema({
  url: String
});
const MsgSchema  = new mongoose.Schema({
  title:{
    type:String,
    required: true,
    trim: true
  },
  content:{
    type: String,
    required:true,
    trim: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  recipient: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  isRead:{
    type: Boolean,
    default:false
  },
  attachements: [attachementsSchema],

  previousMsg:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Msg'
  }
});
const Msg = mongoose.model('Msg', MsgSchema);

module.exports = Msg;
