const HotelModel =require('../models/hotel.model')
const ManageReservationModel =require('../models/booking.model')

const validationResult =require('express-validator').validationResult

exports.getAdd=(req,res,next)=>{
    res.render('add-Hotel',{
        AdminError:req.flash('AdminError')[0],
        validationErrors: req.flash('validationErrors'),
         isUser : true ,
         isAdmin :true,
        UserName:req.session.username,

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







exports.getReservations=(req,res,next)=>{

    let status = req.query.status

    let validCategory =['PENDING','CHECK-IN','CHECK-OUT']
    
    let ReservationsPromise
    if (status && validCategory.includes((status)))
     ReservationsPromise = ManageReservationModel.getReservationBycategory(status)
    
    else

    ReservationsPromise =  ManageReservationModel.getAllBooking()




    ReservationsPromise.then(bookings =>{
        res.render('m-bookings',{
            bookings:bookings,
            isUser : true ,
            isAdmin :true,
        UserName:req.session.username,

            pageTitle:'Manage Booking'




    })

})} 



exports.postSave = (req, res, next) => {

     console.log(req.body)
  

  ManageReservationModel.editItem(
    req.body.PreBookingId,
    {
      status: req.body.status,
      total:req.body.total,
      timestamp: Date.now()
    }
  )
  .then(() => res.redirect('/admin/booking'))
  .catch(err => console.log(err))
}
   



