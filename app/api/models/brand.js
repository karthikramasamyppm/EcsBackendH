const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    
    name: {
		type: String,
		trim: true,		
		required: true,
	},
	filename: { 
		type: String,
		trim: true,		
		required: true,
	},
	categoryid : [{ type: Schema.Types.ObjectId, ref: 'Category' }] 
            
}, {
    timestamps: true

});

module.exports = mongoose.model('Brand', BrandSchema)