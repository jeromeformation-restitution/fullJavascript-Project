var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares/auth');
const User        = require('../model/user');
const {ObjectID}  = require('mongodb');
const userController = require('../controllers/user-controller.js');

// Point de montage "/users"
/* Liste de tous les utilisateurs */
router.get('/', userController.list);
//Création d'un utilisateur
router.post('/', userController.createCheck);
//Connexion utilisateur
router.post('/login', userController.connect);
// Pour visualiser le profil de l'utilisateur connecté
router.get('/profil', authenticate, userController.show);
// Pour visualiser un profil d'un autre user
router.get('/profil/:slug', userController.display);
// pour modifier son profil
router.patch('/profil', authenticate, userController.update);
//pour supprimer un utilisateur
router.delete('/profil', authenticate, userController.delete);
// Pour déconnecter un user :
router.post('/logout', authenticate, userController.logout);
//Pour déconnecter un user de toutes les sessions ouvertes
router.post('/logoutall', authenticate, userController.logoutAll);
//Pour rechercher les users par profession
router.post('/search', userController.search);
module.exports = router;
