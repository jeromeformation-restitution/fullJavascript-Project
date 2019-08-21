const Post = require('../model/post');
const {ObjectID}  = require('mongodb');
const slug = require('slug');

/**
 * Affichage de toutes les annonces (GET sur le point de montage "/annonces")
 * @param req
 * @param res
 * @param next
 */
module.exports.list = (req, res, next) => {
  Post.find((err, posts) => {
    if (err) {
      console.log(posts);
      next(err);
    } else {
      console.log(posts);
      res.json(posts);
    }
  });
};
/**
 * Enregistrement d'une annonce (POST sur le point de montage "/annonces")
 * @param req
 * @param res
 * @return String
 */
module.exports.createCheck = async (req, res) => {
  // Récupération des variables postées
  const post = new Post(req.body);
  // Mise en plus du slug
  post.slug = slug(post.title, {lower: true});
  //Pour la catégorie, il faut récuperer un tableau d'objet de la part du front : ex:[{"libelle":"travaux manuels"}]
  post['category'] = JSON.parse(req.body.category);
  post.author = req.user;
  try{
    await post.save();
    res.status(201).json({post})
  }catch(e){
    res.status(400).json(e)
  }
};
/**
 * Affichage du détail de l'annonce (GET sur le point de montage "/annonces/:slug")
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.show = async (req,res)=> {
  const params = req.params;
  Post.findOne({slug: params.slug}, (err, post) => {
    if (err)
      next(err);
    else
      console.log(post);
    res.json(post);
  });
};
/**
 * Modification d'une annonce (PATCH sur le point de montage "/annonces/:slug")
 * @param req
 * @param res
 * @returns {Promise<*|void>}
 */
module.exports.update = async (req,res) => {
  //Récupération du slug dans l'URL
  const params = req.params;
  //Mise a jour du slug en fonction du nouveau titre (si il existe)
  if (req.body.title){
    req.body.slug = slug(req.body.title, {lower: true});
  }
  //Requete MongoDB qui trouve le post en BDD, l'update et renvoi le post modifié (grace à {new:true})
  Post.findOneAndUpdate({slug: params.slug}, req.body, {new: true},(err, postBDD) => {
    if (err)
      res.json('Erreur lors de la mise à jour');
    else {
      res.json(postBDD);
    }
  });
};
/**
 * Suppression d'une annonce (DELETE sur le point de montage "/annonces/:slug"
 * @param req
 * @param res
 * @returns {Promise<*|void>}
 */
module.exports.delete = async (req,res) => {
  const params = req.params;
  Post.findOne({slug: params.slug}, async (err, post) => {
    if (err)
      next(err);
    else
      try {
        await post.remove();
        res.json('Annonce bien supprimée');
      } catch (error) {
        res.status(500).send();
      }
  });
};
