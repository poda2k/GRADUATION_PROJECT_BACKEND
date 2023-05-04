const posts = require('../DataBase/Post');

exports.gethome = (req, res , next) => {
    posts.findAll()
    .then(result => {
        res.status(200).json({ posts: result});
    console.log(result)
    })
    .catch(err =>{
        console.log(err);
    });

}

exports.posthome = (req, res , next) => {
    // const id = 14 ;
    const name  = 'poda';
    const imageUrl = req.body.imageUrl;
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