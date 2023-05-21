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
// GET //


//  POST //
router.post('/courses/ADDtoCart/:courseID' , Auth.userAuth , course.postADDCart);
router.post('/course/create_course',Auth.checkforpartners,course.POSTcourse);

//  POST //

//  DELETE  //

router.delete('/cart/deletecoursefromcart',Auth.userAuth,course.DELETEcoursefromcart);

//  DELETE  //

module.exports = router;