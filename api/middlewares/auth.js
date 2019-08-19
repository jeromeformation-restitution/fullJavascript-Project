// Pour vérifier la validité du token, si le token est reconnu, on connecte l'utilisateur, sinon on renvoie une erreur 401
const jwt  = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req,res,next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim();

    const decoded  = jwt.verify(token, process.env.JWT_SECRET);

    const user  = await User.findOne({ _id:decoded._id, 'tokens.token': token});

    if(!user){
      throw new Error()
    }
    req.token = token;
    req.user = user;
    next()
  } catch (error) {
    console.log(error);
    res.status(401).send({error:'Please authenticate!'})
  }
};

module.exports = auth
