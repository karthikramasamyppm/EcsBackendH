const itemModel=require('../models/item')		
module.exports = {

   /* create: function(req, res, next) {
		itemModel.create({ name: req.body.name, filename:req.body.filename,brandid:req.body.brandid,specification:req.body.specification,description:req.body.description}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Item added successfully!!!", data: null});
				  
				});
	},*/

    create: function(req, res, next) {
		const formData = req.body;
  		console.log('form data', formData);
		itemModel.insertMany(req.body.my_items, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Item added successfully!!!", data: null});
				  
				});
	},
	getAll: function(req, res, next) {
		let itemList = [];

		itemModel.find({}, function(err, items){
			if (err){
				next(err);
			} else{
				for (let item of items) {
					itemList.push({id: item._id,name: item.name,filename:item.filename,brandid:item.brandid,specification:item.specification,description:item.description});
				}
				res.json({status:"success", message: "Item list found!!!", data:{items: itemList}});
							
			}

		});
    },
    updateById: function(req, res, next) {
		itemModel.findByIdAndUpdate(req.params.itemid,{filename:req.file.filename,brandid:req.body.brandid,specification:req.body.specification,description:req.body.description }, function(err, itemInfo){

			if(err)
				next(err);
			else {
				console.log("itemInfo:"+itemInfo)
				res.json({status:"success", message: "Item updated successfully!!!", data:null});
			}
		});
	},
	deleteById: function(req, res, next) {
		itemModel.findByIdAndRemove(req.params.itemid, function(err, itemInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Item deleted successfully!!!", data:null});
			}
		});
	},
    getitems: function(req, res, next) {

        itemModel.find().populate('brandid')
        .exec(function(err, c) {
            if (err) { 
                return console.log(err);
            }
            //console.log(c);
            res.json(c);
        });			
    },
	/*getCategory: function(req, res, next) {
		console.log(req.body.categoryid);
		brandModel.find({categoryid:req.body.categoryid}, function(err, brandInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "brand with category found!!!", data:{bran: brandInfo}});
			}
		});
	},
	
	getBrands: function(req, res, next) {
		brandModel.aggregate(
		[
			{
			$lookup: 
				{ 
					from:'categories', 
					localField:'categoryid',
					foreignField: '_id',
					as: 'output'
				}
			}
		], 
			function(err, brandInfo) {
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "brand with category found!!!", data:{bran: brandInfo}});
			}
	 });
	},*/
}