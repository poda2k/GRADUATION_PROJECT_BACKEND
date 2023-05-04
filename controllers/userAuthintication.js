const user = require('../DataBase/mainuserdata');
const bcrypt = require('bcryptjs');
const SEQ = require('sequelize');
const JWT = require('jsonwebtoken') ;

exports.postsignup_customer = (req , res , next) => {
    const username = "test only" ;
    const password = req.body.password ;
    const email = req.body.email ;
    const firstname = req.body.firstname ;
    const lastname = req.body.lastname ;
    const DOB = req.body.DOB ;
    const gender = req.body.gender ;
    const aboutme = req.body.aboutme ;
    const usertype = "student" ;
    const Country = req.body.country ;
    const City = req.body.City ;
    const Mobile_Number_One = req.body.Mobile_Number_One ;
    const Flag = req.body.Flag;
    let studentFlag ;
    let employeeFlage ;
    let TEMP_id ;

    user.user.findOne({
        where: {
                Email_Login: email ,
        }
    }).then(result => {
        if(result) {
            res.json({
                massage : "username or email already exists "
            }) ;
        }else if(!result){
            bcrypt.hash(password, 12);
            user.user.create({
                Username : username ,
                Email_Login : email ,
                Password : password ,
                Date_of_Birth : DOB ,
                First_Name : firstname ,
                Last_Name : lastname ,
                Gender : gender ,
                About_Me : aboutme ,
                user_type : usertype
            }).then(result =>{
                TEMP_id = result.id ;
                res.json({massage: " field created successfully " });
            }).then(result =>{
                user.wallet.create({
                    Wallet_Amount : 0.0 ,
                }).then(result =>{
                    user.customer.create({
                        Total_Courses : 0 ,
                        userId : TEMP_id ,
                        walletId : result.id
                    }).then(result =>{
                        res.status(201).json({
                            massage : "user info all set"
                        });
                    }).catch(err =>{
                        console.log(err);
                    })
                }).catch(err =>{
                    console.log(err);
                })
               
            }).then(result =>{
                user.contacttype.create({
                    Country :Country,
                    City:  City ,
                    Mobile_Number_One : Mobile_Number_One,
                    Facebook_URL:'',
                    Gmail_Email:'',
                    Twitter_URL:'',
                    Gethub_URL:'',
                    LinkedIn_Link:'',
                    userId : TEMP_id
                   }).then(result =>{
                    if (result ){
                        res.json({
                            message: 'successfull contact type creation'
                        });
                      
                    }else {
                        const error = new Error('failed contact type');
                        error.statusCode= 422;
                        throw error;
                    }
                    
                
                   }).catch(err=>{
                    console.log(err);
                   })
            }).then(result=>{
                user.WorkExperience.create({
                    Employment_Status:'',
                    Industry:'',
                    Experience_Level:'',
                    Occupation:'',
                    Employer_Flag:'',
                    Highest_Degree:'',
                    University:'',
                    Field_or_Major:'',
                    Student_Flag:'' ,
                    userId : TEMP_id
                 }).then(result =>{
                    if (result ){
                        if(Flag==='Student'){
                            user.WorkExperience.update(
                                {
                                    Student_Flag : true,
                                    Employer_Flag :false
                                },{
                                where:{ UserId: TEMP_id}
                                }
                            ).catch(err=>console.log(err))
                            res.json({
                                message: 'success'
                            });
                        }else if(Flag==='Employer'){
                            user.WorkExperience.update(
                                {
                                    Student_Flag : false,
                                    Employer_Flag : true
                                },{
                                where:{ UserId: TEMP_id}
                                }
                            ).catch(err=>console.log(err))
                            res.json({
                                message: 'success'
                            });
                        }else if(Flag==='Both'){
                            user.WorkExperience.update(
                                {
                                    Student_Flag : true,
                                    Employer_Flag :true
                                },{
                                where:{ UserId: TEMP_id}
                                }
                            ).catch(err=>console.log(err))
                            res.json({
                                message: 'success'
                            });
                        }
                    }else {
                        const error = new Error('field work experience');
                        error.statusCode= 422;
                        throw error;
                    }
                    
                
                   }).catch(error =>{
                    console.log(error);
                   })
            
            })
            .catch(err =>{
                console.log(err);
            });
        }}

    )
    .catch(err =>{
        console.log(err);
    })
}

exports.POSTlogin = (req, res , next) =>{
    const email = req.body.email ;
    const password = req.body.password ;
    let logged_user ;
    user.user.findOne({
        where : {
            Email_Login : email
        }
    }).then(result =>{
        if(result){
            logged_user = result ;
        }else{
        res.json({
            massage : " email is wrong " 
        });
    }
    }).then(result=>{
        bcrypt.compare(password ,logged_user.Password )
        .then(isEquals =>{
            if(!isEquals){
                res.json({
                    massage : "password not correct"
                });
            }
           const token =  JWT.sign({
                email : logged_user.email ,
                password : logged_user.password
            }, 'supersecretKEY',{expiresIn :'1h'})
            res.json({
                massage : "logged in successfully" ,
                token : token
            })
        })
        .catch(err =>{
            console.log(err);
        })
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.postconact_type = (req , res , next) => {
   const Country =req.body.Country;
   const City =req.body.City;
   const Mobile_Number_One= req.body.Mobile_Number_One;
   const Mobile_Number_Two= req.body.Mobile_Number_Two;
   const Facebook_URL= req.body.Facebook_URL;
   const Gmail_Email = req.body.Gmail_Email;
   const Twitter_URL =req.body.Twitter_URL;
   const Gethub_URL = req.body.Gethub_URL;
   const LinkedIn_Link = req.body.LinkedIn_Link;
   user.contacttype.create({
    Country :Country,
    City: City ,
    Mobile_Number_One :Mobile_Number_One ,
    Facebook_URL:Facebook_URL,
    Gmail_Email:Gmail_Email,
    Twitter_URL:Twitter_URL,
    Gethub_URL:Gethub_URL,
    LinkedIn_Link:LinkedIn_Link
   }).then(result =>{
    if (result ){
        res.json({
            message: 'success'
        });
      
    }else {
        const error = new Error('field contact type');
        error.statusCode= 422;
        throw error;
    }
    

   }).catch(error =>{
    console.log(error);
   })



}
exports.postwork_Experience = (req , res , next) => {
    const Employment_Status = req.body.Employment_Status;
    const Industry =req.body.Industry;
    const Experience_Level = req.body.Experience_Level;
    const Occupation = req.body.Occupation;
    const Employer_Flag = req.body.Employer_Flag;
    const Highest_Degree = req.body.Highest_Degree;
    const University = req.body.University;
    const Field_or_Major = req.body.Field_or_Major;
    const Student_Flag = req.body.Student_Flag;
     user.WorkExperience.create({
        Employment_Status:Employment_Status,
        Industry:Industry,
        Experience_Level:Experience_Level,
        Occupation:Occupation,
        Employer_Flag:Employer_Flag,
        Highest_Degree:Highest_Degree,
        University:University,
        Field_or_Major:Field_or_Major,
        Student_Flag:Student_Flag

     }).then(result =>{
        if (result ){
            res.json({
                message: 'success'
            });
          
        }else {
            const error = new Error('field work experience');
            error.statusCode= 422;
            throw error;
        }
        
    
       }).catch(error =>{
        console.log(error);
       })

}