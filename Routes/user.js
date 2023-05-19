const express = require('express');
const route = express.Router();
const userAuth = require('../controllers/userAuthintication');
const Admincontroller = require('../controllers/AdminController');
const course = require('../controllers/course');
const isAuth = require('../middle_ware/is-auth');


route.post('/login', userAuth.POSTlogin);
route.post('/signup' , userAuth.postsignup_customer);
// route.post('/signup/interests' , userAuth.POSTinterests);
route.post('/contact_type' , isAuth.userAuth ,userAuth.postconact_type);
route.post('/work_experience' ,isAuth.userAuth, userAuth.postwork_Experience);
route.post('/register/instructor',userAuth.Postinstructor);
route.post('/create/educationalpartner' , isAuth.Admin , Admincontroller.POSTeducationpartner);


//  GET USER DATA //
route.get('/Admin/PendingInstructors',isAuth.Admin,Admincontroller.GETpendingInstructors);  
route.get('/Admin/ApprovedInstructors',isAuth.Admin,Admincontroller.GETApprovedInstructors);
route.get('/Admin/Allusers',isAuth.Admin,Admincontroller.GETALLusers);
route.get('/instructor-details/:instructorId' , course.Getinstructorconponent);
route.get('/allinstructors' , Admincontroller.GETallinstructors );
route.get('/instructorprofile/:userId' , course.Getinstructorprofile) ;
route.get('/instructors/instructorcomponent/:userId' , course.Getinstructorconponent);

//update instructor//
route.put('/Admin/updateInstructor/:userId',isAuth.Admin, Admincontroller.UPDATEinstructorStatus );


// DELETE //
route.delete('/Admin/deleteInstructor/:instructorId' ,isAuth.Admin,Admincontroller.DELETEinstructor );
route.delete('/Admin/deleteCustomer/:customerId' ,isAuth.Admin,Admincontroller.DELETECustomer);

module.exports = route ;