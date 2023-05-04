const express = require('express');
const route = express.Router();
const userAuth = require('../controllers/userAuthintication');

route.post('/login', userAuth.POSTlogin);
route.post('/signup' , userAuth.postsignup_customer);
route.post('/contact_type' , userAuth.postconact_type);
route.post('/work_experience' , userAuth.postwork_Experience);

module.exports = route ;