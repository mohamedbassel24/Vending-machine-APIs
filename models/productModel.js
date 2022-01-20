const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema( {
	
	amountAvailable: Number,
	cost: Number,
	productName: String,
	sellerId: String

}),
Product = mongoose.model('Product', productSchema);

module.exports = Product;