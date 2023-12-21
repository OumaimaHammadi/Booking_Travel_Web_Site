


exports.getFile=(req,res,next)=>{
    res.render('thanks',{
        isUser : true ,
        isAdmin :req.session.isAdmin,
        pageTitle:'Thank you'


    })

}
