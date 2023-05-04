const posts = require('../DataBase/Post');

exports.gethome = (req, res , next) => {
   const currentpage = req.query.page || 1 ;
   const perpage = 3 ;
   let totalPosts ;
    posts.findAll({
        offset : ((currentpage - 1)*perpage) ,
        limit : perpage 
    })
    .then(result => {
        totalPosts = result.length;
        res.status(200).json({ 
            posts: result ,
        totalPosts : totalPosts
        });
    console.log(result)
    })
    .catch(err =>{
        console.log(err);
    });

}

exports.posthome = (req, res , next) => {
    // const id = 14 ;
    // if(!req.file){
    //     const error = new Error('Invalid no file captured') ;
    //     error.statusCode = 422 ;
    //     throw error ;
    // }
    const name  = 'poda';
    const imageUrl = 'image'
    const title = req.body.title;
    const content = req.body.content;

    posts.create({
        title : title,
        content : content,
        imageUrl : imageUrl,
        creator : name,
    })
    .then( result => {
        console.log(result);
        res.status(201).json({
            message : 'post created successful',
            posts : result
        })
    })
    .catch(err =>{
        console.log(err);
    })

}

exports.GETsinglepost = (req, res , next) => {
    const id = req.params.postId ;
   
    posts.findOne({
        where :{
            id : id,
        }
    }).then( result => {
        if(!result) {
            console.log('fetching failed');
        }
        
        res.status(200).json({
            massage : "post fetched" ,
            post : result
        })
    }).catch( err =>{
        console.log(err);
    })
}

exports.updatepost = (req,res) => {
    const id = req.params.postId ;
    const title = req.body.title ;
    const content = req.body.content ;
    const image = 'image'
    const name = 'poda'

    posts.update(
       
        {
            title : title ,
            content : content ,
            imageUrl : image ,
            creator : name
        }, {
        where :{
            id : id
        } 
    })
    .then( result => {
        if(!result){
            const error = new Error("error in updating post cant find post") ;
            error.statusCode = 422 ;
            throw error ;
        }

        res.status(200).json({
            massage : 'post updated successfully' ,
            post : result
        })
    }).catch( err =>{
        const error = new Error("error in updating post") ;
        error.statusCode = 422 ;
        throw error ;
    })
}

exports.DELETEpost = (req,res,next)=>{

    const id = req.params.postId ;

    posts.destroy({
        where : {
            id : id
        }
    }).then( result=>{
        if(!result){
            const error = new Error('cant delete post') ;
            error.statusCode = 422 ;
            throw error ;
        }
        res.status(200).json({
            massage : 'post deleted successfully' ,
        })
    })
    .catch(err=>{
        console.log(err);
    })
}