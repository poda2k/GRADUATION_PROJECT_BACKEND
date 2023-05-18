const express = require( 'express' );

const app = express();
const bodyParser = require( 'body-parser' );
const home = require( './Routes/main' );
const userRoutes = require( './Routes/user' );
const course = require( './Routes/course_route' );
const database = require( './DataBase/DB_con' );
const user = require( './DataBase/USER' );
const POST = require( './DataBase/Post' );
const mainproduct = require( './DataBase/mainproduct' );
const mainuserdata = require( './DataBase/mainuserdata' );
const coursesDetails = require( './DataBase/coursesDetails' );
const Analysis = require( './DataBase/Analysis' );
const payment = require( './DataBase/payment' );
const path = require( 'path' );
const multer = require( 'multer' );
const { v4: uuidv4 } = require( 'uuid' );

// const cors = require( 'cors' );
// app.use( cors( {
//     origin: [ 'http://localhost:8080', 'http://localhost:4000' ],
//     credentials: true,
//     optionSuccessStatus: 200
// } ) );


const fileFilter = ( req, file, cb ) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb( null, true );
    } else {
        cb( null, false );
    }
}
const FileStorage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb( null, 'images' );     // giving the destination and null error in the callback
    },
    filename: function ( req, file, cb ) {
        cb( null, 's' + uuidv4() + '-' + file.originalname );
    }
} );
app.use( multer( { storage: FileStorage, fileFilter: fileFilter } ).single( 'image' ) );
app.use( bodyParser.json() );
app.use( '/', express.static( path.join( __dirname, 'images' ) ) );

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE, OPTIONS ,PATCH' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' );
    next();
} )

//test
app.use( home );
app.use( userRoutes );
app.use( course );

// dd
// Admin Account DON`T DELETE THIS ROW //
// mainuserdata.user.create({
//     Name : 'A nice person' ,
//     Email_Login : 'Admin@admin.com',
//     Password : 'onlyAdmin123',
//     user_type: 'admin',
//     Gender: 'male',
//     About_Me : 'I am the Admin Of this Website',

// })
// .then((result)=>{
//     console.log(result);
// })
// .catch((err)=>{
//     console.log(err);
// });

// Admin Account //






// app.use(multer({storage:FileStorage , fileFilter: fileFilter}).single('image')) ;



user.hasMany( POST );
POST.belongsTo( user );



// this field for mainproduct.js file 
//countane main category , sub category , topic tabels 
mainproduct.maincat.hasMany( mainproduct.subcat );
mainproduct.subcat.belongsTo( mainproduct.maincat );
mainproduct.subcat.hasMany( mainproduct.topic );
mainproduct.topic.belongsTo( mainproduct.subcat );
mainproduct.subcat.hasMany( Analysis.intrst );
Analysis.intrst.belongsTo( mainproduct.subcat );
//------------------------------------------------

// this field for mainuserdata.js file 
//countane user , user type , contact type , Work Experience tabels 

mainuserdata.user.hasOne( mainuserdata.contacttype );
mainuserdata.contacttype.belongsTo( mainuserdata.user );
mainuserdata.user.hasOne( mainuserdata.WorkExperience );
mainuserdata.WorkExperience.belongsTo( mainuserdata.user );
mainuserdata.user.hasMany( mainuserdata.customer );
mainuserdata.customer.belongsTo( mainuserdata.user );
mainuserdata.user.hasMany( mainuserdata.instructor )
mainuserdata.instructor.belongsTo( mainuserdata.user );
mainuserdata.user.hasOne( mainuserdata.partner );
mainuserdata.partner.belongsTo( mainuserdata.user );
mainuserdata.wallet.hasOne( mainuserdata.partner );
mainuserdata.partner.belongsTo( mainuserdata.wallet );
mainuserdata.wallet.hasOne( mainuserdata.instructor );
mainuserdata.instructor.belongsTo( mainuserdata.wallet );
mainuserdata.wallet.hasOne( mainuserdata.customer );
mainuserdata.customer.belongsTo( mainuserdata.wallet );
mainuserdata.partner.hasMany( mainuserdata.location );
mainuserdata.location.belongsTo( mainuserdata.partner );
mainuserdata.partner.hasMany( mainuserdata.instructor );
mainuserdata.instructor.belongsTo( mainuserdata.partner );




//-------------------------------------------------

// This filed from coursesdetails.js file
//contain course, topic , skills gain, prerequiste
mainproduct.topic.hasMany( coursesDetails.course );
coursesDetails.course.belongsTo( mainproduct.topic );
coursesDetails.course.hasMany( coursesDetails.prereq );
coursesDetails.prereq.belongsTo( coursesDetails.course );
coursesDetails.course.hasMany( coursesDetails.skillgain );
coursesDetails.skillgain.belongsTo( coursesDetails.course );
coursesDetails.course.hasMany( coursesDetails.sections );
coursesDetails.sections.belongsTo( coursesDetails.course );
coursesDetails.sections.hasMany( coursesDetails.lesson );
coursesDetails.lesson.belongsTo( coursesDetails.sections );
coursesDetails.lesson.hasMany( coursesDetails.onsite );
coursesDetails.onsite.belongsTo( coursesDetails.lesson );
coursesDetails.lesson.hasMany( coursesDetails.live );
coursesDetails.live.belongsTo( coursesDetails.lesson );
coursesDetails.lesson.hasMany( coursesDetails.recorded );
coursesDetails.recorded.belongsTo( coursesDetails.lesson );

coursesDetails.pack.belongsToMany( coursesDetails.course, { through: 'Package Course' } );
coursesDetails.course.belongsToMany( coursesDetails.pack, { through: 'Package Course' } );

coursesDetails.course.hasMany( coursesDetails.off_cour );
coursesDetails.off_cour.belongsTo( coursesDetails.course );

coursesDetails.pack.hasMany( coursesDetails.off_pack );
coursesDetails.off_pack.belongsTo( coursesDetails.pack );

mainuserdata.instructor.hasOne( coursesDetails.lesson );
coursesDetails.lesson.belongsTo( mainuserdata.instructor );

mainuserdata.partner.hasMany( coursesDetails.course, );
coursesDetails.course.belongsTo( mainuserdata.partner );

mainuserdata.instructor.hasMany( coursesDetails.course );
coursesDetails.course.belongsTo( mainuserdata.instructor );

coursesDetails.course.hasMany( coursesDetails.off_cour );
coursesDetails.off_cour.belongsTo( coursesDetails.course );

coursesDetails.course.hasMany( coursesDetails.cust_course );
coursesDetails.cust_course.belongsTo( coursesDetails.course );

mainuserdata.customer.hasMany( coursesDetails.cust_course );
coursesDetails.cust_course.belongsTo( mainuserdata.customer );

coursesDetails.pack.hasMany( coursesDetails.off_pack );
coursesDetails.off_pack.belongsTo( coursesDetails.pack );

//-------------------------------------------------------
//this field for relation between customer, courses table and analysis file
mainuserdata.customer.hasMany( Analysis.crt );
Analysis.crt.belongsTo( mainuserdata.customer );


mainuserdata.customer.hasMany( Analysis.intrst );
Analysis.intrst.belongsTo( mainuserdata.customer );

mainuserdata.customer.hasMany( Analysis.search_his );
Analysis.search_his.belongsTo( mainuserdata.customer );

mainuserdata.customer.hasOne( Analysis.wishlist );
Analysis.wishlist.belongsTo( mainuserdata.customer );

coursesDetails.course.belongsToMany( Analysis.wishlist, { through: 'courses_wishlist' } );
Analysis.wishlist.belongsToMany( coursesDetails.course, { through: 'courses_wishlist' } );

coursesDetails.course.belongsToMany( Analysis.crt, { through: 'course_cart' } );
Analysis.crt.belongsToMany( coursesDetails.course, { through: 'course_cart' } );

coursesDetails.course.hasMany( Analysis.search_his );
Analysis.search_his.belongsTo( coursesDetails.course );

//------------------------------------------------------------

// this field for relations between course and exam file 
mainuserdata.customer.hasMany( mainuserdata.cust_exam );
mainuserdata.cust_exam.belongsTo( mainuserdata.customer );

coursesDetails.exam.hasMany( mainuserdata.cust_exam );
mainuserdata.cust_exam.belongsTo( coursesDetails.exam );

mainuserdata.instructor.hasMany( coursesDetails.exam );
coursesDetails.exam.belongsTo( mainuserdata.instructor );

coursesDetails.sections.hasOne( coursesDetails.exam );
coursesDetails.exam.belongsTo( coursesDetails.sections );

coursesDetails.course.hasOne( coursesDetails.exam );
coursesDetails.exam.belongsTo( coursesDetails.course );

//--------------------------------------------------------

//this field for payment file 
//contains payment  , promocode tabels
payment.promocode.hasOne( payment.payment );
payment.payment.belongsTo( payment.promocode );
Analysis.crt.hasOne( payment.payment );
payment.payment.belongsTo( Analysis.crt );
mainuserdata.customer.hasMany( payment.payment );
payment.payment.belongsTo( mainuserdata.customer );

//--------------------------------------------------------

database.sync()
    .then( ( result ) => {
        app.listen( 4000 );
        console.log( 'ok' )
    } )
    .catch( err => {
        console.error( err );
    } );

