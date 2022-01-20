var express = require('express');
var router = express.Router();

const users = require('../controllers/user.controller');

// Create a new user
router.post('/', users.create);

// Retrieve all users
router.get('/', users.findAll);

// Retrieve a single user with userId
router.get('/:username', users.findOne);

// Update a user with userId
router.put('/:username', users.update);

// Delete a user with userId
router.delete('/:username', users.delete);

module.exports = router;
