const  Sequelize = require('sequelize');
const connec = require('./DBcon');
// user table
const user = connec.define('user',{

    Username : {
        type:Sequelize.STRING,
        allowNull : false,
        validate :{
            // The number of characters must be between 5 and 15. (You may specify a different range according to your requirements, but do make changes in the regex accordingly.)
            // The string should only contain alphanumeric characters and/or underscores (_).
            // The first character of the string should be alphabetic.
            is :/^[A-Za-z]\\w{4,14}$/,
            // check the value is not in user 
            notIn: [['user']],

        }
    },

    First_Name : {
        type:Sequelize.STRING,
        allowNull : false,
        // will only allow letters
        validate : {
            isAlpha: true
        }
    }, 
    Last_Name : {
        type:Sequelize.STRING,
        allowNull : false,
        // will only allow letters
        validate : {
            isAlpha: true
        }
    },
    Email_Login : {
        type:Sequelize.STRING,
        allowNull : true,
        validate : {
            isEmail: true, 
        }
    },
    Password  : {
        type:Sequelize.STRING,
        allowNull : false,

        validate: {
        // The password is at least 8 characters long (?=.{8,}).

        // The password has at least one uppercase letter (?=.*[A-Z]).

        // The password has at least one lowercase letter (?=.*[a-z]).

        // The password has at least one digit (?=.*[0-9]).

        // The password has at least one special character ([^A-Za-z0-9]).
            is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

        }
    },
    Image_Profile : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Date_of_Birth : {
        type:Sequelize.DATEONLY,
        allowNull : true,
        validate:{
        // only allow date strings
        isDate: true,
    },
},

    // registeagion_date attribute created auto with my sql workbench by createdAt attribure
    
    Gender : {
        type:Sequelize.STRING,
        allowNull : false,
        validate:{
            // only allow a specific value
            equals: ['Male ','Female']
            

        }

    },
    About_Me : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Age : {
        type:Sequelize.INTEGER,
        allowNull : true
    }

});
//-------------------------------------



//user type table 
const user_type = connec.define('user type',{
    User_Type_Name : {
        type:Sequelize.STRING,
        allowNull : false
    }

});
//--------------------------------------

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
        validate: {
            is: /^\+?[1-9][0-9]{7,14}$/
        }
    },
    Mobile_Number_Two : {
        type:Sequelize.STRING,
        allowNull : true,
        validate: {
            is: /^\+?[1-9][0-9]{7,14}$/
        }
    },
    Facebook_URL : {
        type:Sequelize.STRING,
        allowNull : true,
        validate: {
            // checks for url format (https://foo.com)
            isUrl: true,
        }
    },
    Gmail_Email : {
        type:Sequelize.STRING,
        allowNull : true
    },
    Twitter_URL : {
        type:Sequelize.STRING,
        allowNull : true,
        validate: {
            // checks for url format (https://foo.com)
            isUrl: true,
        }
    },
    Gethub_URL : {
        type:Sequelize.STRING,
        allowNull : true,
        validate: {
            // checks for url format (https://foo.com)
            isUrl: true,
        }
    },
    LinkedIn_Link : {
        type:Sequelize.STRING,
        allowNull : true,
        validate: {
            // checks for url format (https://foo.com)
            isUrl: true,
        }
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
})
module.exports= {
    user,
    user_type,
    contacttype,
    WorkExperience
}
//---------------------------------
