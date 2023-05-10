const express = require('express');
const router = express.Router();
const Auth = require('../middle_ware/is-auth');
const course = require('../controllers/course');

router.get('/course/:courseId',course.GETcourse);
router.post('/course/create_course',Auth.checkforpartners,course.POSTcourse);

module.exports = router;