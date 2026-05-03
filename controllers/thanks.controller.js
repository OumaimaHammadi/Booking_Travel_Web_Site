exports.getFile=(req,res,next)=>{
    res.render('thanks',{
        isUser : true ,
        isAdmin :req.session.isAdmin,
        UserName:req.session.username,

        pageTitle:'Thank you'


    })

}
