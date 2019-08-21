var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares/auth');
const msgController = require('../controllers/msg-controller.js');

// Point de montage "/msg"
/* Liste de tous les messages */
router.get('/', authenticate, msgController.list);
// Pour visualiser un message
router.get('/:id', authenticate, msgController.show);
// Pour envoyer un message
router.post('/send', authenticate,  msgController.send);
//pour supprimer un message
router.delete('/:id', authenticate, msgController.delete);

module.exports = router;




