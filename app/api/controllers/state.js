const stateModel=require('../models/state')	
module.exports = {

    create: function(req, res, next) {
		stateModel.create({ name: req.body.name,countryid:req.body.countryid }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "state added successfully!!!", data: null});
				  
				});
		},
		getAll: function(req, res, next) {
			let stateList = [];

			stateModel.find({}, function(err, state){
				if (err){
					next(err);
				} else{
					for (let states of state) {
						stateList.push({id: states._id,name: states.name,countryid:states.countryid});
					}
					res.json({status:"success", message: "state list found!!!", data:{states: stateList}});
								
				}

			});
		},
		getstates: function(req, res, next) {

				stateModel.find().populate('countryid').exec(function(err, c) {
				if (err) { 
					return console.log(err);
				}
				//console.log(c);
				res.json(c);
			});			
		},

}

