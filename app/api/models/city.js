const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    
    name: {
		type: String,
		trim: true,		
		required: true,
	},
	
	stateid : { type: Schema.Types.ObjectId, ref: 'state' } 
            
}, {
    timestamps: true

});

module.exports = mongoose.model('City', CitySchema)