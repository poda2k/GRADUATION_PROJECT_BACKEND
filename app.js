const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const home = require('./Routes/main');
const database = require('./DataBase/DBcon');
const user = require('./DataBase/USER');
const POST = require('./DataBase/Post');
const mainproduct=require('./DataBase/mainproduct');
const mainuserdata=require('./DataBase/mainuserdata');
const path = require('path') ;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE, OPTIONS ,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(home);

const FileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');       // giving the destination and null error in the callback
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4()  + '-' + file.originalname) ;
    }
});

const fileFilter = (req , file , cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        cb(null ,true) ;
    }else {
        cb(null,false);
    }
}

app.use(multer({storage:FileStorage , fileFilter: fileFilter}).single('image')) ;

user.hasMany(POST);
POST.belongsTo(user);



// this field for mainproduct.js file 
//countane main category , sub category , topic tabels 
mainproduct.maincat.hasMany(mainproduct.subcat);
mainproduct.subcat.belongsTo(mainproduct.maincat);
mainproduct.subcat.hasMany(mainproduct.topic);
mainproduct.topic.belongsTo(mainproduct.subcat);
//------------------------------------------------

// this field for mainuserdata.js file 
//countane user , user type , contact type , Work Experience tabels 

mainuserdata.user.hasOne(mainuserdata.contacttype);
mainuserdata.contacttype.belongsTo(mainuserdata.user);
mainuserdata.user_type.hasOne(mainuserdata.user);
mainuserdata.user.belongsTo(mainuserdata.user_type);
mainuserdata.user.hasOne(mainuserdata.WorkExperience);
mainuserdata.WorkExperience.belongsTo(mainuserdata.user);

//-------------------------------------------------
database.sync() 
.then((result) => {
    app.listen(4000);
})
.catch(err =>{
    console.error(err);
});

