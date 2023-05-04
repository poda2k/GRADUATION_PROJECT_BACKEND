const SEQ = require('./DBcon') ;
const sequelize = require('sequelize') ;

const user =  SEQ.define('user',{
    id : {
        type : sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true
    } ,
    name: {
        type : sequelize.STRING ,
        allowNull : false ,
    } ,
    email : {
        type : sequelize.STRING ,
        allowNull : false ,
    },
    password : {
        type : sequelize.STRING ,
        allowNull : false ,
    }
});

module.exports = user;
