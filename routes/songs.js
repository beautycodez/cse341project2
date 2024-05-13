const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs');

router.get('/', songsController.getAll);

router.get('/:id', songsController.getSingle);

router.post('/', songsController.createsong);

router.put('/:id', songsController.updatesong);

router.delete('/:id', songsController.deletesong);

module.exports = router;