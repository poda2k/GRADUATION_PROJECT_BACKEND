const SEQ = require('sequelize') ;

const Sequelize = new SEQ('tailor_campus','root','123456789',{dialect:'mysql',host:'localhost'}) ;

module.exports = Sequelize ;
