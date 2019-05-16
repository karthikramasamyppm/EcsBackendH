const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    
    name: {
		type: String,
		trim: true,		
		required: true,
	},
	
	countryid : { type: Schema.Types.ObjectId, ref: 'Country' } 
            
}, {
    timestamps: true

});

module.exports = mongoose.model('State', StateSchema)