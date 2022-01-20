var express = require('express');
var router = express.Router();

const product = require('../controllers/product.controller');

// Create a new Note
router.post('/', product.create);

// Retrieve all product
router.get('/', product.findAll);

// Retrieve a single Note with productId
router.get('/:productName', product.findOne);

// Update a Note with productId
router.put('/:productName', product.update);

// Delete a Note with productId
router.delete('/:productName', product.delete);

module.exports = router;
