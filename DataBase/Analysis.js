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
}   
});

const course_cart = connec.define('course_cart',{});

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
    course_cart
}
