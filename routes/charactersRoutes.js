const express = require('express');
const router = express.Router();
const auth = require('../middleware/is-auth');

const charactersController = require('../controllers/charactersController');

router.get('/characters/:id', auth, charactersController.getCharacterById);

router.get('/characters', auth, charactersController.getCharacters);

router.post('/characters', auth, charactersController.postCharacter);

router.post('/characters/:id', auth, charactersController.postCharacterById);

router.delete('/characters/:id', auth, charactersController.deleteCharacter);

module.exports = router;