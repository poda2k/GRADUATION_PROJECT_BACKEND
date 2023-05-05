const JWT = require('jsonwebtoken') ;

// normal user access token //
exports.userAuth = (req ,res ,next) => {
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
    req.userType = decodedToken.role;

    next();
}

exports.Admin = (req , res , next)=>{
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken ;
    try{
        decodedToken = JWT.verify(token,'supersecretKEY')
    }catch(err){
        console.log(err);
    }
    if(!decodedToken){
        const error = new Error('unauthorized token');
        error.statusCode = 422 ;
        throw error;
    }else{
        req.userId = decodedToken.userId;
        req.userType = decodedToken.role;

    if(req.userType === 'admin'){
        next();
    }else{
        const error = new Error('unauthorized user');
        error.statusCode = 422 ;
        throw error;
    }
}
}