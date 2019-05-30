const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    
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
  brandid : { 
    type: Schema.Types.ObjectId, ref: 'Brand'
  }, 
  specification: {
		type: String,
		trim: true,		
		required: true,
  },
  description: {
		type: String,
		trim: true,		
		required: true,
  },
}, 
{
    timestamps: true

});

module.exports = mongoose.model('Item', ItemSchema)