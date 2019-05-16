const cityModel=require('../models/city')	
module.exports = {

    create: function(req, res, next) {
		cityModel.create({ name: req.body.name,stateid:req.body.stateid }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "City added successfully!!!", data: null});
				  
				});
		},
		getAll: function(req, res, next) {
			let cityList = [];

			cityModel.find({}, function(err, city){
				if (err){
					next(err);
				} else{
					for (let cities of city) {
						cityList.push({id: cities._id,name: cities.name,stateid:cities.stateid});
					}
					res.json({status:"success", message: "city list found!!!", data:{cities: cityList}});
								
				}

			});
		},
		getcities: function(req, res, next) {

			cityModel.find().populate('stateid')
			.exec(function(err, c) {
				if (err) { 
					return console.log(err);
				}
				//console.log(c);
				res.json(c);
			});			
		},

}

