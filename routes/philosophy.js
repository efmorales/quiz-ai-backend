const express = require('express');
const router = express.Router();
const philosophyController = require('../controllers/philosophyController');

router.get('/all-philosophies', philosophyController.getAllPhilosophies);

router.get('/:id', philosophyController.getPhilosophyById);

router.post('/create-philosophy', philosophyController.createPhilosophy);

router.put ('/:id', philosophyController.updatePhilosophy);

router.delete ('/:id', philosophyController.deletePhilosophy);


module.exports = router;