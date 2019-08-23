const Msg = require('../model/msg');

/**
 * Affichage de tous les messages (GET sur le point de montage "/msg")
 * @param req
 * @param res
 * @param next
 */
module.exports.list = (req, res, next) => {
  Msg.find({"recipient": req.user._id})
    .populate('author')
    .populate('recipient')
    .exec(
    (err, msgs) => {
    if (err) {
      next(err);
    } else {
      if ( msgs.length > 0 ){
        console.log(msgs);
        res.json(msgs);
      } else {
        res.json("Aucun message trouvé");
      }
    }
  });
};
/**
 * Création d'un message (POST sur le point de montage "/send")
 * @param req
 * @param res
 * @return String
 */
module.exports.send = async (req, res) => {
  // Récupération des variables postées
  const msg = new Msg(req.body);
  msg.author = req.user._id;
  try{
    await msg.save();
    res.status(201).json({msg})
  }catch(e){
    res.status(400).json(e)
  }
};
/**
 * Affichage du détail d'un message (GET sur le point de montage "/:id")
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.show = async (req,res)=> {
  const params = req.params;
  Msg.findOne({_id: params.id})
    .populate('author')
    .populate('recipient')
    .exec((err, msg) => {
    if (err)
      next(err);
    else
      console.log(msg);
    res.json(msg);
  });
};
/**
 * Suppression d'un message (DELETE sur le point de montage "/:id"
 * @param req
 * @param res
 * @returns {Promise<*|void>}
 */
module.exports.delete = async (req,res) => {
  const params = req.params;
  Msg.findOne({_id: params.id}, async (err, msg) => {
    if (err)
      next(err);
    else
      try {
        await msg.remove();
        res.json('Message bien supprimé');
      } catch (error) {
        res.status(500).send();
      }
  });
};
















