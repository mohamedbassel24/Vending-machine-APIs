const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	
	username: String,
	password: String,
    deposit:Number,
    role :String
}),
User = mongoose.model('User', userSchema);

module.exports = User;