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
  ram: {
		type: String,
		trim: true,		
		required: true,
  },
  internalstorage: {
		type: String,
		trim: true,		
		required: true,
  },
  backcamera: {
		type: String,
		trim: true,		
		required: true,
  },
  batterybackup: {
		type: String,
		trim: true,		
		required: true,
  },
  processortype: {
		type: String,
		trim: true,		
		required: true,
	},    
            
}, 
{
    timestamps: true

});

module.exports = mongoose.model('Item', ItemSchema)