const express = require('express');
const router = express.Router();
const Auth = require('../middle_ware/is-auth');
const course = require('../controllers/course');

router.get('/course/:courseId',course.GETcourse);
router.get('/courses',course.GETallcourses);
router.get('/getsinglecourse/:courseid',course.singlecoursepage);
router.get('/courseSidebar' , course.GETcourseSidebarcard);
router.post('/course/create_course',Auth.checkforpartners,course.POSTcourse);

module.exports = router;