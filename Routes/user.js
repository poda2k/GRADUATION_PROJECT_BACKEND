const express = require('express');
const route = express.Router();
const userAuth = require('../controllers/userAuthintication');
const isAuth = require('../middle_ware/is-auth');

route.post('/login', userAuth.POSTlogin);
route.post('/signup' , userAuth.postsignup_customer);
// route.post('/signup/interests' , userAuth.POSTinterests);
route.post('/contact_type' , isAuth ,userAuth.postconact_type);
route.post('/work_experience' ,isAuth, userAuth.postwork_Experience);

module.exports = route ;