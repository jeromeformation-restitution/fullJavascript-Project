var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares/auth');
const User        = require('../model/user');
const {ObjectID}  = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Création d'un utilisateur
router.post('/users', async (req,res) => {
  const user = new User(req.body);
  try{
    const token = await user.newAuthToken();
    res.status(201).send({user, token})
  }catch(e){
    res.status(400).send(e)
  }
});

//Connexion utilisateur
router.post('/users/login', async (req, res) => {
  try {
    const user  = await User.checkValidCredentials(req.body.email, req.body.password);
    const token = await user.newAuthToken();
    res.send({ user, token})
  } catch (error) {
    res.status(400).send()
  }
});
// Pour visulaiser son profil
router.get('/users/profil', authenticate ,async (req,res)=> {
  res.send(req.user)
});

// pour modifier son profil
router.patch('/users/profil',authenticate ,async (req,res) => {
  const updates  = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  const _id =  req.user._id;

  if(!isValidOperation){
    res.status(400).send({error:'Invalid request'})
  }

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send()
  }

});

//pour supprimer un utilisateur

router.delete('/users/profil', authenticate, async (req,res) => {
  if (!ObjectID.isValid(req.user._id)) {
    return res.status(404).send();
  }

  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

// Pour déconnecter un user :

router.post('/users/logout', authenticate, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) =>{
      return token.token !== req.token
    });
    await req.user.save();
    res.send()
  } catch (error) {
    res.status(500).send()
  }
});

router.post('/users/logoutall', authenticate, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send()
  } catch (error) {
    res.status(500).send()
  }
});


module.exports = router;
