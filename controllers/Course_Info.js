const mainproduct = require('../DataBase/mainproduct');

// get , post ,update and delete for main cat
exports.POSTmaincategory = (req, res, next) => {

    const catName = req.body.catName;

    mainproduct.maincat.create({
        Main_Cat_Name: catName
    }).then(result => {
            res.status(201).json({
            });

        }).catch(err => {
            console.log(err);
        })
}
exports.GETmaincategory = (req, res, next) => {

    mainproduct.maincat.findAll()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            console.error(err);
        })
}
exports.Putmaincategory = (req, res, next) => {
    const id = req.params.maincategoryId;
    const Main_Cat_Name =req.body.Main_Cat_Name ;
    mainproduct.maincat.update(
        {
            Main_Cat_Name : Main_Cat_Name 
        },{
           where: {
               id : id
           }
        }
       ).then(result => {
        res.status(200).json({ data: result });
    })
    .catch(err => {
        console.error(err);
    })
}
exports.Deletemaincategory = (req, res, next) => {
    const id = req.params.maincategoryId ;
    mainproduct.maincat.destroy({
        where: {
            id : id
        }
    }).then(result => {
        res.status(200).json({ data: result });
    })
    .catch(err => {
        console.error(err);
    })
}
//--------------------------------------------------
// get , post ,update and delete for sub cat

exports.POSTsubcategory = (req, res, next) => {

    const mainCatId = req.params.mainCatId;
    const subcatname = req.body.subcatname;

    mainproduct.subcat.create({
        mainCategoryId: mainCatId,
        SubCat_Name: subcatname
    }).then(result => {
        res.status(201).json({
            massage: 'success'
        })
    }).catch(err => {
        console.log(err);
    });
}
exports.Getsubcategory = (req, res, next) => {
    mainproduct.subcat.findAll()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            console.error(err);
        })
}

exports.Putsubcategory = (req, res, next )  => {
    const SubCat_Name = req.body.SubCat_Name ;
    const id =req.params.subcategoryId;
    mainproduct.topic.update(
     {
        SubCat_Name : SubCat_Name 
     },{
        where: {
            id : id
        }
     }
    ).then(result => {
        res.status(200).json({ data: result });
    })
    .catch(err => {
        console.error(err);
    })
}
exports.Deletesubcategory = (req, res, next ) => {
    const id = req.params.subcategoryId 
    mainproduct.subcat.destroy({
        where: {
            id : id
        }
    }).then(result => {
        res.status(200).json({ data: result });
    })
    .catch(err => {
        console.error(err);
    })
}
//--------------------------------------------
// get , post ,update and delete for topic
exports.Posttopic = (req, res, next) => {
    const subcategoryId = req.body.subcategoryId;
    const Topic_Name = req.body.Topic_Name;

    mainproduct.topic.create({
        subcategoryId: subcategoryId,
        Topic_Name: Topic_Name
    }).then(result => {
        res.status(201).json()
    }).catch(err=>{
        console.log(err) ;
    });
}

 exports.Gettopic = (req, res, next) => {
    mainproduct.topic.findAll()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            console.error(err);
        })
}
exports.Puttopic = (req, res, next )  => {
    const Topic_Name = req.body.Topic_Name ;
    const topicId =req.params.topicId;
    mainproduct.topic.update(
     {
        Topic_Name : Topic_Name 
     },{
        where: {
            id : topicId
        }
     }
    ).then(result => {
        res.status(200).json({ data: result });
    })
    .catch(err => {
        console.error(err);
    })
}
exports.Deletetopic = (req, res, next) => {
    const id = req.params.topicId 
    mainproduct.topic.destroy({
        where: {
            id : id
        }
    }).then(result => {
        res.status(200).json({ data: result });
    })
    .catch(err => {
        console.error(err);
    })
}

//-------------------------------------------------
