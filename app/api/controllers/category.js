const categoryModel = require('../models/category');
var fs = require("fs");

  
  
module.exports = {

    create: function(req, res, next) {
			//var fullPath = "uploads/"+req.file.filename;

		categoryModel.create({ name: req.body.name,filename:req.file.filename,status:req.body.status },function (err, result) {
				  if (err) 
				  	next(err);
				  else
					  console.log(req.files);
					  console.log(res)
				  	res.json({status: "success", message: "category added successfully!!!", data: null});
				  
				});
	},
	/*create: function(req, res, next) {
		//var fullPath = "uploads/"+req.file.filename;

	categoryModel.create({filename:req.file.filename },function (err, result) {
				if (err) 
					next(err);
				else
					console.log(req.files);
					console.log(res)
					res.json({status: "success", message: "category added successfully!!!", data: null});
				
			});
},*/
	updateById: function(req, res, next) {
		categoryModel.findByIdAndUpdate(req.params.categoryId,{filename:req.file.filename,status:req.body.status}, function(err, categoryInfo){

			if(err)
				next(err);
			else {
				console.log("categoryInfo:"+categoryInfo)
				res.json({status:"success", message: "category updated successfully!!!", data:null});
			}
		});
	},
	deleteById: function(req, res, next) {
		categoryModel.findByIdAndRemove(req.params.categoryId, function(err, categoryInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "category deleted successfully!!!", data:null});
			}
		});
	},

    getAll: function(req, res, next) {
		let categoryList = [];

		categoryModel.find({}, function(err, category){
			if (err){
				next(err);
			} else{
				for (let categor of category) {
					categoryList.push({id: categor._id,name: categor.name,filename: categor.filename});
				}
				res.json({status:"success", message: "categories list found!!!", data:{category: categoryList}});
							
			}

		});
	},
	/*getcategory: function (req, res) {
		let categoryList = [];
    categoryModel.find(function (err, category){
    if(err){
      console.log(err);
    }
    else {
			/*for (let categor of category) {
	 		
			image=fs.createReadStream("./"+categor.filename);
			categoryList.push({id: categor._id,name: categor.name,filename:image});
			console.log(image)
			}
			res.writeHead(200,{'content-type':'image/png'});
			res.end(category);
			//res.writeHead({status:"success", message: "categories list found!!!", data:{category: categoryList}});
		}*/
		/*for (let categor of category) {
		//image=fs.createReadStream("./"+categor.filename);
		res.writeHead(200,{'Content-type':'image/png'});
		fs.createReadStream("./"+categor.filename).pipe(res);
		//res.end(category);
		}
		//res.json(category);
    }
	});*/
	getcategory:(req, res, next) => {
		categoryModel
			.find()
			// .select('_id name price')
			.exec()
			.then(category => {
				const response = {
					count: category.length,
					category: category.map(category => {
						return {
							_id: category._id,
							name: category.name,
							filename: "http://localhost:3000/uploads/"+category.filename,
							status: category.status,
						}
					})
				};
				res.status(200).json(response);
			})
			.catch(error => {
				next(error);
			})
	}
}