const JWT = require('jsonwebtoken') ;

// normal user access token //
module.exports = (req ,res ,next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken ;
    try{
        decodedToken = JWT.verify(token,'supersecretKEY');
    }catch(err){
        console.log(err);
    }
    if(!decodedToken){
        const error = new Error('unauthorized token');
        error.statusCode = 422 ;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}