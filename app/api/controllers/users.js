const userModel = require('../models/users');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');               

module.exports = {
    create: function(req, res, next) {
        
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password,roles: req.body.role }, function (err, result) {
                  if (err) 
                    next(err);
                  else
                    res.json({status: "success", message: "User added successfully!!!", data: null});
                  
                });
    },
    getById: function(req, res, next) {
        console.log(req.body);
        userModel.findOne({email:req.body.email}, function(err, userInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "user found!!!", data:{user: userInfo}});
            }
        });
},
    authenticate: function(req, res, next) {
        userModel.findOne({email:req.body.email}, function(err, userInfo){
                    if (err) {
                        next(err);
                    } else {

                        if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

                         const token = jwt.sign({id: userInfo._id,role: userInfo.role}, req.app.get('secretKey'), { expiresIn: '1h' }); 

                         res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});    

                        }else{

                            res.json({status:"error", message: "Invalid email/password!!!", data:null});

                        }
                    }
                });
    },
    forgotpassword: function(req, res, next) {
        userModel.findOne({email:req.body.email}, function(err, userInfo){
                    if (err) {
                        next(err);
                    } else {
                        console.log(userInfo)
                        if(userInfo != null) {

                         const token = jwt.sign({id: userInfo._id,role: userInfo.role}, req.app.get('secretKey'), { expiresIn: '1h' }); 
              const email = req.body.email;
              const updateObject ={resetPasswordToken:token,resetPasswordExpires: Date.now() + 360000};
              userModel.update({ email:email }, { $set:updateObject })
                .exec()
                .then(() => {
                  console.log("update:"+res);
                })
                          const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: 'karthikramasamy90@gmail.com',
                              pass: '',
                            },
                          });
                  
                          const mailOptions = { 
                            from: 'karthikramasamyppm90@gmail.com',
                            to: `${userInfo.email}`,
                            subject: 'Link To Reset Password',
                            text:
                              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                              + `http://localhost:3000/users/reset/${token}\n\n`
                              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                  };
                console.log('sending mail');

                transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.error('there was an error: ', err);
                } else {
                  console.log('here is the res: ', response);
                  res.status(200).json('recovery email sent');
                }
            });
                  
                         //res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});  

                        }else{

                            res.json({status:"error", message: "Invalid email/password!!!", data:null});

                        }
                    }
                });
		},
		resetpassword: function(req, res, next) {
		//	userModel.findOne({email:req.body.email}, function(err, userInfo){
			userModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).exec(function(err, userInfo) {
									if (err) {
											next(err);
									} else {
											console.log(userInfo)
											if(userInfo != null) {
													userInfo.password = req.body.password;
													userInfo.resetPasswordToken = undefined;
													userInfo.resetPasswordExpires = undefined;
													userInfo.save()
													.then(() => {
														console.log("update:"+res);
											})
											const transporter = nodemailer.createTransport({
													service: 'gmail',
													auth: {
														user: 'karthikramasamy90@gmail.com',
														pass: 'Akra@12901',
													},
											});
								
											const mailOptions = { 
													from: 'karthikramasamy90@gmail.com',
													to: `${userInfo.email}`,
													subject: 'Your password has been changed',
													text: 'Hello,\n\n' +
														'This is a confirmation that the password for your account ' + userInfo.email + ' has just been changed.\n'
											};
								console.log('sending mail');
								description
							transporter.sendMail(mailOptions, (err, response) => {
							if (err) {
								console.error('there was an error: ', err);
							} else {
								console.log('here is the res: ', response);
								res.status(200).json('Success! Your password has been changed.');
							}
					});
								
											 //res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});  

											}else{

													res.json({status:"error", message: "not valid", data:null});

											}
									}
							});
	},

}                   