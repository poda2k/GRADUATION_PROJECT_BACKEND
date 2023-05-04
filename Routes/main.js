const express = require('express'); 

const router = express.Router();
const home = require('../controllers/home');
const category = require('../controllers/Course_Info');

router.get('/', home.gethome ) ;
router.post('/post', home.posthome);
router.get('/posts/:postId', home.GETsinglepost);

//     category routes        //
router.get('/category', category.GETmaincategory);
router.post('/category/post', category.POSTmaincategory);
router.get('/category/id',category.GetmaincategoryID);
router.post('/category/subcat',category.POSTsubcategory) ;
module.exports = router ;