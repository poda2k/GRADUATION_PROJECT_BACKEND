const express = require('express');
const router = express.Router();
const Auth = require('../middle_ware/is-auth');
const course = require('../controllers/course');

// GET //

router.get('/course/:courseId',course.GETcourse);
router.get('/courses',course.GETallcourses);
router.get('/getsinglecourse/:courseid',course.singlecoursepage);
router.get('/courseSidebar/:courseId' , course.GETcourseSidebarcard);
router.get('/cart', Auth.userAuth , course.getCart);
router.get('/mywishlist', Auth.userAuth ,course.GetWishlist)
router.get('/mycourses', Auth.userAuth , course.getmylearning);

// GET //


//  POST //

router.post('/courses/ADDtoCart/:courseID' , Auth.userAuth , course.postADDCart);
router.post('/course/create_course',Auth.checkforpartners,course.POSTcourse);
router.post('/course/addToWishlist/:courseId',Auth.userAuth ,course.addTowishlist);
router.post('/course/purchase/:cartid',Auth.userAuth,course.postpayment);

//  POST //

//  DELETE  //

router.delete('/cart/deletecoursefromcart/:courseId',Auth.userAuth,course.DELETEcoursefromcart);
router.delete('/wishlist/delete/:courseId',Auth.userAuth,course.deletewishlist);
router.delete('/course/delete/:courseId',Auth.Admin,course.deletecourse);
//  DELETE  //

module.exports = router;