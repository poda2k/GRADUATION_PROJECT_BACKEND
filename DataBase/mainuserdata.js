const  Sequelize = require('sequelize');
const connec = require('./DB_con');
const bcrypt = require('sequelize-bcrypt');
// user table
const user = connec.define('user',{

    Username : {
        type:Sequelize.STRING,
        allowNull : false,
       
    },

    First_Name : {
        type:Sequelize.STRING,
        allowNull : false,
       
    }, 
    Last_Name : {
        type:Sequelize.STRING,
        allowNull : false,
       
    },
    Email_Login : {
        type:Sequelize.STRING,
        allowNull : true,
      
    },
    Password  : {
        type:Sequelize.STRING,
        allowNull : false,

    },
    Image_Profile : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Date_of_Birth : {
        type:Sequelize.DATEONLY,
        allowNull : true,
       
},

    // registeagion_date attribute created auto with my sql workbench by createdAt attribure
    
    Gender : {
        type:Sequelize.STRING,
        allowNull : false,
       
    },
    About_Me : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Age : {
        type:Sequelize.INTEGER,
        allowNull : true
    },
    user_type: {
        type: Sequelize.STRING
    }

});
// encrypting password //
bcrypt(user ,{
    field : 'Password' ,
    rounds : 12 ,
    compare : 'authenticated'
});
//-------------------------------------
//contact type table
const contacttype = connec.define('contact type',{
    Country : {
        type:Sequelize.STRING,
        allowNull : true
    },
    City : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Mobile_Number_One : {
        type:Sequelize.STRING,
        allowNull : true,
       
    },
    Mobile_Number_Two : {
        type:Sequelize.STRING,
        allowNull : true,
       
    },
    Facebook_URL : {
        type:Sequelize.STRING,
        allowNull : true,

    },
    Gmail_Email : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Twitter_URL : {
        type:Sequelize.STRING,
        allowNull : true,

    },
    Gethub_URL : {
        type:Sequelize.STRING,
        allowNull : true,
 
    },
    LinkedIn_Link : {
        type:Sequelize.STRING,
        allowNull : true,
    },
});


//--------------------------------------

// Work Experience table 
const WorkExperience = connec.define('Work Experience',{
    Employment_Status : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Industry : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Experience_Level : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Occupation : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Employer_Flag : {
        type:Sequelize.BOOLEAN,
        allowNull : true
    },
    Highest_Degree : {
        type:Sequelize.STRING,
        allowNull : true
    },
    University : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Field_or_Major : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Student_Flag : {
        type:Sequelize.BOOLEAN,
        allowNull : true
    },
});


const customer = connec.define('customer',{
    Total_Courses : {
        type:Sequelize.INTEGER,
        allowNull: true
    }
});
const cust_exam = connec.define('customer exam',{
    exam_Score : {
        type:Sequelize.INTEGER,
    },
    exam_certification : {
        type:Sequelize.STRING,
    },

});

const instructor = connec.define('instructor', {
    Total_Courses_tech : {
        type : Sequelize.INTEGER,
        allowNull: true
    },
    Ins_Bio : {
        type : Sequelize.STRING,
        allowNull:true
    },
    Ins_Rate: {
        type: Sequelize.INTEGER,
        validate :{
            max:5
        },
        allowNull: true,
    },
    Num_of_Total_Rates: {
        type: Sequelize.INTEGER,
        allowNull: true 
    },
    Admin_approvement_ins:{
        type: Sequelize.BOOLEAN

    }

});

const partner=connec.define('Educational_Partner',{
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notIn:['Eductaion_Partner']
        }
    }
    ,Phone:{
        type:Sequelize.STRING,
        allowNull:true
    }
    ,Mobile_one:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            is: /^\+?[1-9][0-9]{7,14}$/
        }  
    }
    ,Mobile_two:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            is: /^\+?[1-9][0-9]{7,14}$/
        }  
    }
    ,fax:{
        type:Sequelize.STRING
    }
    ,Rate:{
        type:Sequelize.INTEGER,
        validate:{
            max:5
        }
        ,bio:{
            type:Sequelize.STRING
        }
    }
});
const location=connec.define('Education Partner Location',{
    country:{
        type:Sequelize.STRING,
        allowNull:true
    }
    ,city:{
        type:Sequelize.STRING,
        allowNull:true
    }
    
    ,Google_map:{
        type:Sequelize.STRING,
        allowNull:true
    }

});

const wallet= connec.define('wallet',{
    Wallet_Amount: {
        type:Sequelize.DOUBLE,
    }

});


module.exports= {
    user,
    contacttype,
    WorkExperience,
    customer,
    instructor,
    wallet,
    partner,
    location,
    cust_exam

}
//---------------------------------

