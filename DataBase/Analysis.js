const  Sequelize = require('sequelize');
const connec = require('./DB_con');

const wishlist =connec.define('Wishlists',{
total_courses:{
    type:Sequelize.INTEGER,
}   
});

const crt =connec.define('cart',{
num_courses:{
        type:Sequelize.INTEGER,
}   ,
purchased : {
    type:Sequelize.BOOLEAN,
    allowNull : false
}
});
const course_wishlist = connec.define('courses_wishlist',{
    id : {
        type:Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false,
        primaryKey : true
    }
});

const course_cart = connec.define('course_cart',{
    id :{
        type:Sequelize.INTEGER,
        allowNull:false ,
        autoIncrement:true,
        primaryKey:true
    }
});

const search_his =connec.define('search history',{
search_content:{
        type:Sequelize.STRING,
}   
});

const intrst =connec.define('interests',{
    skill_name:{

        type:Sequelize.STRING,
    }
    
});




module.exports={
    wishlist,
    crt,
    search_his,
    intrst ,
    course_cart ,
    course_wishlist
}
