const itemModel=require('../models/item')		
module.exports = {

    create: function(req, res, next) {
		itemModel.create({ name: req.body.name, filename:req.file.filename,brandid:req.body.brandid,ram:req.body.ram,internalstorage:req.body.internalstorage,backcamera:req.body.backcamera,batterybackup:req.body.batterybackup,processortype:req.body.processortype }, function (err, result) {
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
					itemList.push({id: item._id,name: item.name,filename:item.filename,brandid:item.brandid,ram:item.ram,internalstorage:item.internalstorage,backcamera:item.backcamera,batterybackup:item.batterybackup,processortype:item.processortype});
				}
				res.json({status:"success", message: "Item list found!!!", data:{items: itemList}});
							
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