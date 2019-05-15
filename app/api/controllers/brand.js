const brandModel=require('../models/brand')	
const categoryModel=require('../models/category')	
module.exports = {

    create: function(req, res, next) {
		brandModel.create({ name: req.body.name, filename:req.file.filename,categoryid:req.body.categoryid }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Brand added successfully!!!", data: null});
				  
				});
	},
	getAll: function(req, res, next) {
		let brandList = [];

		brandModel.find({}, function(err, brand){
			if (err){
				next(err);
			} else{
				for (let bran of brand) {
					brandList.push({id: bran._id,name: bran.name,filename:bran.filename,categoryid:bran.categoryid});
				}
				res.json({status:"success", message: "brand list found!!!", data:{brand: brandList}});
							
			}

		});
	},
	getCategory: function(req, res, next) {
		console.log(req.body.categoryid);
		brandModel.find({categoryid:req.body.categoryid}, function(err, brandInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "brand with category found!!!", data:{bran: brandInfo}});
			}
		});
	},
	/*getBrands: function(req, res, next) {
		//console.log(req.body.categoryid);
		brandModel.aggregate({ $lookup: { from:'categories', localField:'categoryid', foreignField: '_id', as: 'output'} }, function(err, brandInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "brand with category found!!!", data:{bran: brandInfo}});
			}
		});
	},*/
	
	/*getBrands: function(req, res, next) {
		brandModel.aggregate({ $lookup: { from:'categories', localField:'categoryid', foreignField: '_id', as: 'output'} }, function(err, brandInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "brand with category found!!!", data:{bran: brandInfo}});
			}
		});
	},*/
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
	},
}