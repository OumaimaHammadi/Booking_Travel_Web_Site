const PaymentModel =require('../models/payement-agence.model')

const validationResult =require('express-validator').validationResult
const BookingModel =require('../models/booking.model')





exports.getBookingByid=(req,res,next)=>{
    let id =req.params.id


    BookingModel.getBookingById(id).then((item) => {


    res.render('payement-agence',{
        item:item,
        
        validationErrors: req.flash('validationErrors'),
        isUser : true ,
        isAdmin :req.session.isAdmin,


         pageTitle:'Payement Agence'


    })
})} 

exports.postAdd=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        PaymentModel.editInfo({
            Civilite: req.body.Civilite,
            Prenom:req.body.Prenom,
            Nom:req.body.Nom,
            Email:req.body.Email,
            Portable:req.body.Portable,


           
           

        })
        .then(() => res.redirect('/payement-agence')) 
        .catch(err =>{
            //res.redirect('/error')
            next(err)
            
            console.log(err)
    
        } )
        
    } else {
    req.flash('validationErrors',
    validationResult(req).array())
    res.redirect('/payement-agence') 
    }     
}