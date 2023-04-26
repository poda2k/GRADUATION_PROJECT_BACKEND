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
    const imageUrl = 'image';
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