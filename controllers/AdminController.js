const user = require('../DataBase/mainuserdata');
const bcrypt = require('bcryptjs');

exports.GETpendingInstructors = (req, res, next) => {
    const instructor = user.instructor 
    const contact_type = user.contacttype
    user.user.findAll({
        where: {
            user_type: 'pending Individual Instructor'
        } ,
        include : [contact_type ,instructor ]
    }).then(userINFO => {
        res.json({ instructor :userINFO })

    }).catch(err => console.log(err));
// ffffffffffffffffffffffffffffffffffffffffffff//
    // user.instructor.findAll({
    //     where: {
    //         Admin_approvement_ins: false
    //     }
    // }).then(result => {
    //     if (!result) {
    //         const error = new Error('no instructors fetched');
    //         throw error;
    //     }
    //     res.status(200).json({ instructorRequests: result });
    // }).catch(err => {
    //     console.log(err);
    // })
}
exports.GETApprovedInstructors = (req, res, next) => {
    const instructor = user.instructor 
    const contact_type = user.contacttype
    user.user.findAll({
        where: {
            user_type: 'Individual Instructor'
        } ,
        include : [contact_type ,instructor ]
    }).then(userINFO => {
        res.json({ instructor :userINFO })

    }).catch(err => console.log(err));
// seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccttion / ///
    // user.instructor.findAll({
    //     where: {
    //         Admin_approvement_ins: true
    //     }
    // }).then(result => {
    //     if (!result) {
    //         const error = new Error('no instructors fetched');
    //         throw error;
    //     }
    //     res.status(200).json({
    //         data: result
    //     })
    // }).catch(err => {
    //     console.log(err);
    // })
}

exports.UPDATEinstructorStatus = async(req, res, next) => {
    const Approved = req.body.Approved;
    const id = req.params.userId;
    const instructor = user.instructor
    const contactType = user.contacttype
    const WorkExperience = user.WorkExperience
// try{
    const instructorinfo = await user.instructor.findOne({
        where : {
            userId : id
        }
    })
    // }catch(error){
    //     console.log(error)
    // }

    if (Approved == true) {
        user.wallet.create({
            Wallet_Amount: 0.0
        }).then(result => {
            user.instructor.update({
                Admin_approvement_ins: Approved,
                walletId: result.id
            }, {
                where: {
                    id : instructorinfo.id
                }
            }
            ).then(result => {
                if (!result) {
                    const error = new Error('update instructor status failed');
                    throw error;
                }
               
            }).catch(err => {
                console.log(err);
            })
        }).then( result2=> {
            user.user.update({
                user_type : "Individual Instructor"
            },{
                where : {
                    id : id
                }
            }).then( result3=> {
                console.log("status updated");
                res.json({
                    massage: 'status updated'
                });
            }).catch( err => {console.log(err);})
        }).catch(err => {
            console.log(err);
        })
    }

    else if(Approved === false)
   { 
    user.user.destroy({
        where : {
            id : id
        } ,
        include :[instructor ,WorkExperience,contactType]
    }).then(result => {
        res.json({massage : "instructor rejected"})
    }).catch(err => {console.log(err);})

}
}

exports.DELETEinstructor = (req, res, next) => {
    const id = req.params.userId;

    user.instructor.findOne({
        where: {
            userId: id
        }
    }).then(result => {
        // let TEMP_id = result.id
        user.instructor.destroy({
            where: {
                id: result.id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            console.log("instructor deleted");
        }).catch(err => console.log(err));
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  //
        user.user.destroy({
            where: {
                id: id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            console.log("instructor deleted");
        }).catch(err => console.log(err));
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  //
        user.WorkExperience.destroy({
            where: {
                userId: id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            console.log("instructor deleted");
        }).catch(err => console.log(err));
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  //
        user.contacttype.destroy({
            where: {
                userId: id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            res.json({
                massage: 'instructor deleted successfully'
            });
        }).catch(err => console.log(err));

    }).catch(err => console.log(err));

}



exports.DELETECustomer = (req, res, next) => {
    const id = req.params.customerId;

    user.customer.findOne({
        where: {
            id: id
        }
    }).then(result => {
        user.customer.destroy({
            where: {
                id: id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            console.log("instructor deleted");
        }).catch(err => console.log(err));
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  //
        user.user.destroy({
            where: {
                userId: result.id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            console.log("instructor deleted");
        }).catch(err => console.log(err));
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  //
        user.WorkExperience.destroy({
            where: {
                userId: result.id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            console.log("instructor deleted");
        }).catch(err => console.log(err));
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  //
        user.contacttype.destroy({
            where: {
                userId: result.id
            }
        }).then(result => {
            if (!result) {
                const error = new Error('error in deleting instructor');
                throw error;
            }
            res.json({
                massage: 'instructor deleted successfully'
            });
        }).catch(err => console.log(err));

    }).catch(err => {
        console.log(err);
    })

}
exports.POSTeducationpartner = (req, res, next) => {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const password = req.body.password;
    const DOB = req.body.DOB;
    const gender = req.body.gender;
    const aboutme = req.body.aboutme;
    const usertype = "pending Education partner ";
    const Country = req.body.country;
    const City = req.body.City;
    const Mobile_Number_One = req.body.Mobile_Number_One;
    const Facebook_URL = req.body.Facebook_URL;
    const Gmail_Email = req.body.Gmail_Email;
    const Twitter_URL = req.body.Twitter_URL;
    const Gethub_URL = req.body.Gethub_URL;
    const LinkedIn_Link = req.body.LinkedIn_Link;
    const edu_Name = req.body.edu_Name;
    const edu_Phone = req.body.edu_Phone;
    const edu_Mobile_one = req.body.edu_Mobile_one;
    const edu_Mobile_two = req.body.edu_Mobile_two;
    const edu_fax = req.body.edu_fax;
    let Temp_id1;
    user.user.findOne({
        where: {
            Email_Login: Email,
        }
    }).then(result => {
        if (result) {
            res.json({
                massage: "username or email already exists "
            });
        } else if (!result) {
            bcrypt.hash(password, 12);
            user.user.create({
                Email_Login: Email,
                Password: password,
                Date_of_Birth: DOB,
                Name: Name,
                Gender: gender,
                About_Me: aboutme,
                user_type: usertype
            }).then(result => {
                TEMP_id1 = result.id;
                user.contacttype.create({
                    Country: Country,
                    City: City,
                    Mobile_Number_One: Mobile_Number_One,
                    Facebook_URL: Facebook_URL,
                    Gmail_Email: Gmail_Email,
                    Twitter_URL: Twitter_URL,
                    Gethub_URL: Gethub_URL,
                    LinkedIn_Link: LinkedIn_Link,
                    userId: TEMP_id1
                }).then(result => {
                    if (!result) {
                        const error = new Error('error in educationalpartnerPOST contacttype');
                        throw error;
                    }
                    console.log("successful");
                }).then(result => {
                    user.WorkExperience.create({
                        Employment_Status: '',
                        Industry: '',
                        Experience_Level: '',
                        Occupation: '',
                        Employer_Flag: '',
                        Highest_Degree: '',
                        University: '',
                        Field_or_Major: '',
                        Student_Flag: '',
                        userId: TEMP_id1
                    }).then(result => {
                        if (!result) {
                            const error = new Error('error in educationalpartnerPOST work experience');
                            throw error;
                        }
                        console.log("successful");
                    }).catch(error => console.log(error));
                    // .catch(err => console.log(err));
                    res.json({
                        massage: "signedup successfully",
                    });
                }).catch(error => console.log(error));
            }).then(result => {
                user.wallet.create({
                    Wallet_Amount: 0.0
                }).catch(error => console.log(error));
            }).then(result => {
                user.partner.create({
                    userId: TEMP_id1,
                    Name: edu_Name,
                    Phone: edu_Phone,
                    Mobile_one: edu_Mobile_one,
                    Mobile_two: edu_Mobile_two,
                    fax: edu_fax,
                    walletId: result.id
                }).then(result => {
                    if (!result) {
                        const error = new Error('error in creating educational partner');
                        throw error;
                    }
                    console.log("creating educational partner success");
                }).catch(err => console.log(err));
            }).catch(error => console.log(error));
        }
    }).catch(err => console.log(err));

}

exports.GETALLusers = (req, res) => {

    user.user.findAll({
        where: {
            user_type: 'student'
        }
    })
        .then(result => {
            if (!result) {
                const error = new Error('no users found');
                throw error;
            }

            res.json({ data: result });
            //   }
        }).catch(err => console.log(err));
}

exports.GETallinstructors = (req, res) => {

    const instructor = user.instructor 
    const contact_type = user.contacttype
    user.user.findAll({
        where: {
            user_type: 'Individual Instructor'
        } ,
        include : [contact_type ,instructor ]
    }).then(userINFO => {
        res.json({ instructor :userINFO })

    }).catch(err => console.log(err));

}