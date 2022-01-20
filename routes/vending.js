var express = require('express');
var router = express.Router();

const vendingMachine = require('../controllers/vending.controller');

// Create a new user
router.put('/deposit', vendingMachine.deposit);

// Retrieve all users
router.put('/buy', vendingMachine.buy);

// Retrieve a single user with userId
router.put('/reset', vendingMachine.reset);


module.exports = router;
