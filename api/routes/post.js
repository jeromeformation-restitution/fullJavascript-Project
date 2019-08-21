const express     = require('express');
const router      =  new express.Router();
const Post        = require('../model/post');
const {ObjectID}  = require('mongodb');
const  postController = require('../controllers/post-controller');
const authenticate = require('../middlewares/auth');

// Point de montage "/annonces"

/* Liste de toutes les annonces */
router.get('/', postController.list);
//Création d'une annonce
router.post('/', authenticate, postController.createCheck);
// Pour visualiser une annonce
router.get('/:slug',  postController.show);
// pour modifier une annonce
router.patch('/:slug', authenticate, postController.update);
//pour supprimer un utilisateur
router.delete('/:slug', authenticate, postController.delete);


module.exports = router;
