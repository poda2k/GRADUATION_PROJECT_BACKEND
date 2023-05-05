const express = require('express'); 
const router = express.Router();
const home = require('../controllers/home');
const category = require('../controllers/Course_Info');
const isAuth = require('../middle_ware/is-auth');

//    TESTING ONLY //
router.get('/', home.gethome ) ;
// router.post('/posts', home.posthome);
router.get('/posts/:postId', home.GETsinglepost);
router.put('/posts/:postId', home.updatepost);
router.delete('/posts/:postId', home.DELETEpost);

// GRADUATION PROJECT //

//     category routes        //
router.post('/category/post',isAuth.Admin, category.POSTmaincategory);
router.post('/category/subcat/:mainCatId' , isAuth.Admin,category.POSTsubcategory);

router.get('/category', category.GETmaincategory);

router.put('/category/maincat/:maincategoryId', isAuth.Admin,category.Putmaincategory);
router.put('/category/maincat/:subcategoryId', isAuth.Admin,category.Putsubcategory);
router.put('/category/topic/:topicId', isAuth.Admin, category.Puttopic);


router.delete('/category/topic/:topicId', isAuth.Admin, category.Deletetopic);
router.delete('/category/maincat/:maincategoryId', isAuth.Admin,category.Deletemaincategory);
router.delete('/category/maincat/:subcategoryId', isAuth.Admin,category.Deletesubcategory);


// router.get('/category/id',category.GetmaincategoryID);
// router.post('/category/subcat',isAuth,category.POSTsubcategory) ;








module.exports = router ;