const PaymentModel =require('../models/payement-agence.model')

const validationResult =require('express-validator').validationResult
const PreBookingModel =require('../models/PreBooking.model')
const reservationModel =require('../models/reservation.model')





exports.getAdd=(req,res,next)=>{
    let id =req.params.id

    ///PreBookingModel.getPreBookingByUser(id).then((items) => {

         PreBookingModel.getPreBookingByUser(req.session.userId).then((items) => {


    res.render('payement-agence',{
        items:items,
        //item:item,

        //AdminError:req.flash('AdminError')[0],
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