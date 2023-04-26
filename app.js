const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const home = require('./Routes/main');
const database = require('./DataBase/DB_con');
const user = require('./DataBase/USER');
const POST = require('./DataBase/Post');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE, OPTIONS ,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(home);

user.hasMany(POST);
POST.belongsTo(user);

database.sync() 
.then((result) => {
    app.listen(4000);
})
.catch(err =>{
    console.error(err);
});

