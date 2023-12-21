
const HotelModel =require('../models/hotel.model')
const ManageReservationModel =require('../models/reservation.model')

const validationResult =require('express-validator').validationResult

exports.getReservations=(req,res,next)=>{
    ManageReservationModel.getPreBookingByUser(req.session.userId).then(orders =>{
        //getItemsByOrders
        res.render('m-reservations',{
            orders:orders,
            isUser : true ,
            //cardId:req.session.userId,
            //isEmail:req.cardId.email,

            isAdmin :true,
            pageTitle:'Manage Reservations',



    })

})}



exports.getAdd=(req,res,next)=>{
    res.render('add-Hotel',{
        AdminError:req.flash('AdminError')[0],
        validationErrors: req.flash('validationErrors'),
         isUser : true ,
         isAdmin :true,

         pageTitle:'Add Hotel'


    })
}

exports.postAdd=(req,res,next)=>{
    //console.log(validationResult(req).array())//
    if(validationResult(req).isEmpty()){
        HotelModel.editImage({
           name: req.body.name,
           price: req.body.price,
           category: req.body.category,
            description:req.body.description,
           image :req.file.originalname,
           
           PrixAllinclusive:req.body.PrixAllinclusive,
           PrixDemiPension:req.body.PrixDemiPension,
           PrixpetitDejeuner:req.body.PrixpetitDejeuner

        })
        .then(() => res.redirect('/')) 
        .catch(err =>{
            //res.redirect('/error')
            next(err)
            
            console.log(err)
    
        } )
        
    } else {
    req.flash('validationErrors',
    validationResult(req).array())
    res.redirect('/admin/add') 
    }     
}







/* exports.getReservations=(req,res,next)=>{

    let status = req.query.status

    let validCategory =['Pending','Waiting','Received']
    
    let ReservationsPromise
    if (status && validCategory.includes((status)))
     ReservationsPromise = ManageReservationModel.getReservationBycategory(status)
    
    else

    ReservationsPromise =  ManageReservationModel.getPreBookingByUser()




    ReservationsPromise.then(orders =>{
        res.render('m-reservations',{
            orders:orders,
            isUser : true ,
            //cardId:req.session.userId,
            //isEmail:req.cardId.email,

            isAdmin :true,
            pageTitle:'Manage Reservations',



    })

})} */




   
   



