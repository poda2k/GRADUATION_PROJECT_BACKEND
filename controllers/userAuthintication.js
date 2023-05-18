const user = require('../DataBase/mainuserdata');
const Analysis = require('../DataBase/Analysis');
const mainproduct = require('../DataBase/mainproduct');
const bcrypt = require('bcryptjs');
const SEQ = require('sequelize');
const JWT = require('jsonwebtoken');
let TEMP_id;
let cust_id;
let subcat_id;
exports.postsignup_customer = (req, res, next) => {
    const username = "test only";
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const DOB = req.body.DOB;
    const gender = req.body.gender;
    const aboutme = req.body.aboutme;
    const usertype = "student";
    const Country = req.body.country;
    const City = req.body.City;
    const Mobile_Number_One = req.body.Mobile_Number_One;
    const Flag = req.body.Flag;
    const intersets_array = req.body.interests;
    let studentFlag;
    let employeeFlage;

    user.user.findOne({
        where: {
            Email_Login: email,
        }
    }).then(result => {
        if (result) {

            res.json({
                massage: "username or email already exists ",
                token: "unauthurized token"
            });
        } else if (!result) {
            bcrypt.hash(password, 12);
            user.user.create({
                Username: username,
                Email_Login: email,
                Password: password,
                Date_of_Birth: DOB,
                Name: name,
                Gender: gender,
                About_Me: aboutme,
                user_type: usertype
            }).then(result => {
                TEMP_id = result.id;
                const token = JWT.sign({
                    email: result.email,
                    password: result.password,
                    role: result.user_type,
                    userId: result.id,
                    userName: result.name
                }, 'supersecretKEY', { expiresIn: '1h' })
                res.json({
                    massage: "signedup successfully",
                    token: token ,
                    role : result.user_type,
                    userID : result.id,
                    
                });
            }).then(result => {
                user.wallet.create({
                    Wallet_Amount: 0.0,
                }).then(result => {
                    user.customer.create({
                        Total_Courses: 0,
                        userId: TEMP_id,
                        walletId: result.id
                    }).then(result => {
                        cust_id = result.id;
                        for (let i = 0; i < intersets_array.length; i++) {
                            mainproduct.subcat.findOne({
                                where: {
                                    SubCat_Name: intersets_array[i]
                                }
                            }).then(result => {
                                Analysis.intrst.create({
                                    skill_name: intersets_array[i],
                                    subcategoryId: result.id,
                                    customerId: cust_id
                                }).then(result => {
                                    // console.log(subcat_id[i]);
                                    if (result) {
                                      console.log('interests posted successfully')
                                    }
                                })
                                    .catch(err => {
                                        console.log(err);
                                    })


                                console.log(intersets_array);
                                // subcat_id[i] = result.id ;
                            }).catch(err => {
                                console.log(err);
                            })
                        }

                        res.status(201).json({
                            massage: "user info all set"
                        });
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                })

            }).then(result => {
                user.contacttype.create({
                    Country: Country,
                    City: City,
                    Mobile_Number_One: Mobile_Number_One,
                    Facebook_URL: '',
                    Gmail_Email: '',
                    Twitter_URL: '',
                    Gethub_URL: '',
                    LinkedIn_Link: '',
                    userId: TEMP_id
                }).then(result => {
                    if (result) {
                        res.json({
                            message: 'successfull contact type creation'
                        });

                    } else {
                        const error = new Error('failed contact type');
                        error.statusCode = 422;
                        throw error;
                    }


                }).catch(err => {
                    console.log(err);
                })
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
                    userId: TEMP_id
                }).then(result => {
                    if (result) {
                        if (Flag === 'Student') {
                            user.WorkExperience.update(
                                {
                                    Student_Flag: true,
                                    Employer_Flag: false
                                }, {
                                where: { UserId: TEMP_id }
                            }
                            ).catch(err => console.log(err))
                            res.json({
                                message: 'success'
                            });
                        } else if (Flag === 'Employer') {
                            user.WorkExperience.update(
                                {
                                    Student_Flag: false,
                                    Employer_Flag: true
                                }, {
                                where: { UserId: TEMP_id }
                            }
                            ).catch(err => console.log(err))
                            res.json({
                                message: 'success'
                            });
                        } else if (Flag === 'Both') {
                            user.WorkExperience.update(
                                {
                                    Student_Flag: true,
                                    Employer_Flag: true
                                }, {
                                where: { UserId: TEMP_id }
                            }
                            ).catch(err => console.log(err))
                            res.json({
                                message: 'success'
                            });
                        }
                    } else {
                        const error = new Error('field work experience');
                        error.statusCode = 422;
                        throw error;
                    }


                }).catch(error => {
                    console.log(error);
                })
            })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    )
        .catch(err => {
            console.log(err);
        })
}

// exports.POSTinterests = (req, res) =>{
//     const intersets_array = req.body.interests ;
//     let subcat_id ;
//         for(let i =0 ; i < intersets_array.length ; i++){
//         mainproduct.subcat.findOne({
//             where :{
//                 SubCat_Name : intersets_array[i]
//             }
//         }).then(result =>{
//             subcat_id = result.id ;
//         }).catch(err =>{
//             console.log(err);
//         })
//         Analysis.intrst.create({
//             skill_name : intersets_array[i] ,
//             customerId : req.cust_id ,
//             subcategoryId : subcat_id 
//         }).then(result =>{
//             if(result){
//             res.status(201).json({
//                 massage : "interests posted successfully"
//             })
//         }
//         })
//         .catch(err=>{
//             console.log(err);
//         })}

// }

exports.POSTlogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let logged_user;
    user.user.findOne({
        where: {
            Email_Login: email
        }
    }).then(result => {
        if (result) {
            logged_user = result;
        } else {
            res.json({
                massage: "email is wrong"
            });
        }
    }).then(result => {
        bcrypt.compare(password, logged_user.Password)
            .then(isEquals => {
                if (!isEquals) {
                    res.json({
                        massage: "password not correct"
                    });
                }
                const token = JWT.sign({
                    email: logged_user.Email_Login,
                    password: logged_user.Password,
                    role: logged_user.user_type,
                    userId: logged_user.id,
                    userName: logged_user.Name
                }, 'supersecretKEY', { expiresIn: '1h' })
                res.json({
                    massage: "logged in successfully",
                    token: token ,
                    role: result.user_type,
                    userId: result.id,
                    userName: result.name
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
        .catch(err => {
            console.log(err);
        });
}

exports.postconact_type = (req, res, next) => {
    const Country = req.body.Country;
    const City = req.body.City;
    const Mobile_Number_One = req.body.Mobile_Number_One;
    const Mobile_Number_Two = req.body.Mobile_Number_Two;
    const Facebook_URL = req.body.Facebook_URL;
    const Gmail_Email = req.body.Gmail_Email;
    const Twitter_URL = req.body.Twitter_URL;
    const Gethub_URL = req.body.Gethub_URL;
    const LinkedIn_Link = req.body.LinkedIn_Link;
    user.contacttype.create({
        Country: Country,
        City: City,
        Mobile_Number_One: Mobile_Number_One,
        Facebook_URL: Facebook_URL,
        Gmail_Email: Gmail_Email,
        Twitter_URL: Twitter_URL,
        Gethub_URL: Gethub_URL,
        LinkedIn_Link: LinkedIn_Link
    }).then(result => {
        if (result) {
            res.json({
                message: 'success'
            });

        } else {
            const error = new Error('failed contact type');
            error.statusCode = 422;
            throw error;
        }


    }).catch(error => {
        console.log(error);
    })



}
exports.postwork_Experience = (req, res, next) => {
    const Employment_Status = req.body.Employment_Status;
    const Industry = req.body.Industry;
    const Experience_Level = req.body.Experience_Level;
    const Occupation = req.body.Occupation;
    const Employer_Flag = req.body.Employer_Flag;
    const Highest_Degree = req.body.Highest_Degree;
    const University = req.body.University;
    const Field_or_Major = req.body.Field_or_Major;
    const Student_Flag = req.body.Student_Flag;
    user.WorkExperience.create({
        Employment_Status: Employment_Status,
        Industry: Industry,
        Experience_Level: Experience_Level,
        Occupation: Occupation,
        Employer_Flag: Employer_Flag,
        Highest_Degree: Highest_Degree,
        University: University,
        Field_or_Major: Field_or_Major,
        Student_Flag: Student_Flag

    }).then(result => {
        if (result) {
            res.json({
                message: 'success'
            });

        } else {
            const error = new Error('field work experience');
            error.statusCode = 422;
            throw error;
        }


    }).catch(error => {
        console.log(error);
    })

}
exports.Postinstructor = (req, res, next) => {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const password = req.body.password;
    // const DOB = req.body.DOB;
    const gender = req.body.gender;
    const aboutme = req.body.aboutme;
    const usertype = "Individual Instructor";
    const Country = req.body.country;
    const City = req.body.City;
    const image = req.file.path.split('\\').join('/');
    const Mobile_Number_One = req.body.Mobile_Number_One;
    const Facebook_URL = req.body.Facebook_URL;
    const Gmail_Email = req.body.Gmail_Email;
    const Twitter_URL = req.body.Twitter_URL;
    const Gethub_URL = req.body.Gethub_URL;
    const LinkedIn_Link = req.body.LinkedIn_Link;
    const speciality = req.body.speciality;
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
                Image_Profile : image ,
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
                        const error = new Error('error in instructorPOST contacttype');
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
                            const error = new Error('error in instructorPOST work experience');
                            throw error;
                        }
                        console.log("successful");
                    }).catch(error=> console.log(error));
                    // .catch(err => console.log(err));
                    res.json({
                        massage: "signedup successfully",
                    });
                }).catch(error=> console.log(error));
            }).then(result =>{
                user.instructor.create({
                    userId:TEMP_id1 ,
                    Total_Courses_tech : 0 ,
                    Ins_Rate : 0,
                    Num_of_Total_Rates: 0 ,
                    specialization : speciality,
                    Admin_approvement_ins: false 
                }).then(result =>{
                  
                }).catch(err => console.log(err));
            }).catch(error=> console.log(error));
        }
    }).catch(err => console.log(err));
}
