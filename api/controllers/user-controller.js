const User = require('../model/user');
const createError = require('http-errors');
const slug = require('slug');
const {ObjectID}  = require('mongodb');
/**
 * Affichage de tous les profils utilisateurs (GET sur le point de montage "/users")
 * @param req
 * @param res
 * @param next
 */
module.exports.list = (req, res, next) => {
    User.find((err, users) => {
        if (err) {
            next(err);
        } else {
            console.log(users);
            res.json(users);
        }
    });
};
/**
 * Enregistrement d'une utilisateur (POST sur le point de montage "/users")
 * @param req
 * @param res
 * @return String
 */
module.exports.createCheck = async (req, res) => {
    // Si le SIRET a été renseigné, on le traite pour avoir un Int (car tous les input renvoient un String)
  if (req.body.SIRET) {
      req.body.SIRET = parseInt(req.body.SIRET);
    }
  // Récupération des variables postées
    const user = new User(req.body);
    //Il faut récuperer un tableau d'objet de la part du front : ex:[{"libelle":"plombier"}]
    user['profession'] = JSON.parse(req.body.profession);
    user['roles'] = JSON.parse(req.body.roles);
    // il faut parcourir le tableau des roles afin de voir si le client a un role "pro". Si oui, on ne valide pas son compte
    user['roles'].forEach((element) => {
      if (element.libelle.includes("pro")){
        user.isValid = 0;
      }
    });
    // Mise en plus du slug
    user.slug = slug(user.username, {lower: true});
    try{
        const token = await user.newAuthToken();
        res.status(201).json({user, token})
    }catch(e){
        res.status(400).json(e)
    }
};
/**
 * Connexion d'un utilisateur (POST sur le point de montage "/users/login")
 * @param req
 * @param res
 * @return String
 */
module.exports.connect = async (req, res) => {
    try {
        const user  = await User.checkValidCredentials(req.body.email, req.body.password);
        const token = await user.newAuthToken();
        res.json({user, token})
    } catch (error) {
        res.status(400).json(error)
    }
};
/**
 * Affichage du profil de l'utilisateur connecté (GET sur le point de montage "/users/profil")
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.show = async (req,res)=> {
    res.json(req.user);
};
/**
 * Affichage d'un profil user en fonction du slug (GET sur le point de montage "/users/profil/:slug")
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.display = async (req,res)=> {
  const params = req.params;
  User.findOne({slug: params.slug}, (err, user) => {
    if (err)
      next(err);
    else
      console.log(user);
      res.json(user);
  });
};

/**
 * Modification du profil de l'utilisateur connecté (PATCH sur le point de montage "/users/profil")
 * @param req
 * @param res
 * @returns {Promise<*|void>}
 */
module.exports.update = async (req,res) => {
    const updates  = Object.keys(req.body);
    const allowedUpdates = ["username", "email", "password", "firstName", "lastName", "adresse", "ville"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    const _id =  req.user._id;
    if(!isValidOperation){
        res.status(400).json({error:'Invalid request'})
    }
    if (!ObjectID.isValid(_id)) {
        return res.status(404).json();
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        res.status(400).json()
    }
};
/**
 * Suppression du prodil de l'utilisateur connecté (DELETE sur le point de montage "/users/profil"
 * @param req
 * @param res
 * @returns {Promise<*|void>}
 */
module.exports.delete = async (req,res) => {
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
};
/**
 * Pour déconnecter l'utilisateur connecté (POST sur le point de montage "/users/logout")
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        });
        await req.user.save();
        res.json('utilisateur deconnecte');
    } catch (error) {
        res.status(500).json();
    }
};
/**
 * Pour déconnecter l'utilisateur de toutes les sessions en cours (POST sur le point de montage "/users/logoutall"
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.json('utilisateur deconnecté de toutes les sessions');
    } catch (error) {
        res.status(500).json();
    }
};

module.exports.search = async (req,res) => {
  const query = {};
  if (req.body.profession) query["profession.libelle"] = new RegExp(req.body.profession,'i');
  if (req.body.ville) query['ville'] = new RegExp(req.body.ville,'i');
  if (req.body.roles) query['roles.libelle'] = new RegExp(req.body.roles,'i');
  console.log(query);
  User.find(
    query,
    (err, users) => {
      if (err)
        next(err);
      else
        res.json(users);
    });
};
