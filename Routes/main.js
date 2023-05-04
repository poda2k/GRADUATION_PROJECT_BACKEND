const express = require('express'); 

const router = express.Router();
const home = require('../controllers/home');
const category = require('../controllers/Course_Info');

//    TESTING ONLY //
router.get('/', home.gethome ) ;
router.post('/posts', home.posthome);
router.get('/posts/:postId', home.GETsinglepost);
router.put('/posts/:postId', home.updatepost);
router.delete('/posts/:postId', home.DELETEpost);

// GRADUATION PROJECT //

//     category routes        //
router.get('/category', category.GETmaincategory);
router.post('/category/post', category.POSTmaincategory);
router.get('/category/id',category.GetmaincategoryID);
router.post('/category/subcat',category.POSTsubcategory) ;





module.exports = router ;