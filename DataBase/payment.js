const sequelize =require('sequelize');
const connec =require('./DB_con');



const payment = connec.define('payment',{
    payment_amount:{
        type: sequelize.DOUBLE,
        allowNull: false 
    },
    Discount_Amount:{
        type: sequelize.DOUBLE,
    },
    Payment_Amount_AF_discount:{
        type: sequelize.DOUBLE
    }
});

const promocode = connec.define('promocode',{
    Discount_Percentage:{
        type: sequelize.DOUBLE
    },
    Using_Flag:{
        type :sequelize.BOOLEAN
    },
    Discount_Amount:{
        type:sequelize.DOUBLE
    }

})
module.exports={
    payment,
    promocode
}