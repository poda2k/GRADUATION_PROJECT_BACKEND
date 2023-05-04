const  Sequelize = require('sequelize');
const connec = require('./DBcon');




    const maincat = connec.define('main category',{

    Main_Cat_Name : {
        type:Sequelize.STRING,
        allowNull : false
    },

});

    const subcat = connec.define('subcategory',{
   
    SubCat_Name: {
        type:Sequelize.STRING,
        allowNull: false 
    }


});


    const topic = connec.define('topic',{
   
    Topic_Name :{
        type:Sequelize.STRING,
        allowNull: false
    }

});


module.exports= {
    maincat,
    subcat,
    topic
}


