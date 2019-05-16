const countryModel=require('../models/country')	
	
module.exports = {

    create: function(req, res, next) {
		countryModel.create({ name: req.body.name}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Country added successfully!!!", data: null});
				  
				});
	},
	getAll: function(req, res, next) {
		let countryList = [];

		countryModel.find({}, function(err, country){
			if (err){
				next(err);
			} else{
				for (let coun of country) {
					countryList.push({id: coun._id,name: coun.name});
				}
				res.json({status:"success", message: "Country list found!!!", data:{country: countryList}});
							
			}

		});
	},
	updateById: function(req, res, next) {
		countryModel.findByIdAndUpdate(req.params.countryId,{name:req.body.name}, function(err, countryInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Country Updated Successfully!!!", data:null});
			}
		});
	},
	deleteById: function(req, res, next) {
		countryModel.findByIdAndRemove(req.params.countryId, function(err, countryInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Country Deleted Successfully!!!", data:null});
			}
		});
	},
getCountry:(req, res, next) => {
		countryModel
			.find()
			.exec()
			.then(country => {
				const response = {
					count: country.length,
					country: country.map(country => {
						return {
							_id: country._id,
							name: country.name
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