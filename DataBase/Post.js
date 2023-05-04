const SEQ = require('./DB_con');
const SEQUELIZE = require('sequelize');

const Post = SEQ.define('Post',{
    id :{
        type : SEQUELIZE.INTEGER ,
        primaryKey : true,
        allowNull : false ,
        autoIncrement : true
    },
    title : {
        type : SEQUELIZE.STRING ,
        allowNull : false 
    },
    imageUrl : {
        type : SEQUELIZE.STRING ,
        allowNull : false
    } ,
    content : {
        type : SEQUELIZE.STRING ,
        allowNull : false
    },
    creator : {
        type : SEQUELIZE.STRING ,
        allowNull : false
    }
});

module.exports = Post;