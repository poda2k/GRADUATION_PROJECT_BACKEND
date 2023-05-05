const mainproduct = require('../DataBase/mainproduct');


exports.GETmaincategory = (req, res, next) => {
    
    mainproduct.maincat.findAll()
    .then(result => {
        res.status(200).json({ data : result });
    })
    .catch(err => {
        console.error(err);
    })
}

exports.POSTmaincategory = (req, res, next) => {

    const catName = req.body.catName ;

    mainproduct.maincat.create({
        Main_Cat_Name : catName
    })
    .then(result => {
        console.log(result);
        result = req.maincatID ;
        res.status(201).json({
            massage : 'success'
         });
         
    })
    .catch(err => {
        console.error(err);
    })
}

exports.GetmaincategoryID = (req,res, next) => {
    const mainCatid = req.body.catid ;
    
    mainproduct.maincat.findOne(
        {
            where :{
                id : mainCatid
            }
        }
    ).then(result => {
        res.status(201).json({
            result : result
        })
    }).catch(err=>{
        console.log(err)
    })
    
}

exports.POSTsubcategory = (req, res, next) => {

    const mainCatid = req.body.mainCatid ;
    const subcatname = req.body.subcatname ;

    mainproduct.subcat.create({
        mainCategoryId : mainCatid ,
        SubCat_Name : subcatname
    }).then(result => {
        console.log(result);
        res.status(201).json({
            massage : 'success'
        })
    }).catch(err=>{
        console.log(err) ;
    });
}