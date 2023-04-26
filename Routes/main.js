const express = require('express'); 

const router = express.Router();
const home = require('../controllers/home');

router.get('/', home.gethome ) ;
router.post('/post', home.posthome);


module.exports = router ;