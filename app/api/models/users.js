const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	roles:{
        type: String,
        enum: ['admin','user','vendor'],
        // admin,
        // developer
        default: 'admin'
	},
	resetPasswordToken:{
		type: String,
		trim: true
	},
	resetPasswordExpires: {
		type: Date,
		trim: true,
		default: Date.now
	},
	
});

UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

module.exports = mongoose.model('User', UserSchema);