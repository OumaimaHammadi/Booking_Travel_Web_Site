const BookingModel =require('../models/booking.model')
const validationResult = require('express-validator').validationResult
const UserModel= require('../models/auth.model')


exports.getBooking = (req,res,next) =>{
    BookingModel.getBookingByUser(req.session.userId).then((items) => {
   res.render('booking', { 
         items:items,
         validationError: req.flash('validationErrors')[0],
         isUser : true,
        isAdmin :req.session.isAdmin,
        UserName:req.session.username,

         pageTitle:'Booking'


        })

 
    }).catch(err => {
        //next(err)

        console.log(err)

    }
       
    )
}

 

exports.postBooking=async(req,res,next)=>{
      try {
    if (!validationResult(req).isEmpty()) {
      req.flash('validationErrors', validationResult(req).array())
      return res.redirect(req.body.redirectTo)
    }

    const user = await UserModel.findUserById(req.session.userId)

    if (!user) {
      return res.status(401).send('User not found')
    }


  await BookingModel.addNewBooking ({
                name:req.body.name ,
                NbreChambre:req.body.NbreChambre ,
                NbreAdult:req.body.NbreAdult ,
                NbreEnfant:req.body.NbreEnfant ,

                ChildAge:req.body.ChildAge,

                NbreNuit:req.body.NbreNuit ,

                Arrivee:req.body.Arrivee ,
                Departure:req.body.Departure ,


                total:req.body.total,
                price :req.body.price,
                productId : req.body.productId,
                userId: req.session.userId,
                supplement:req.body.supplement,

                PrixAllinclusive:req.body.PrixAllinclusive ,
                PrixDemiPension:req.body.PrixDemiPension ,
                PrixpetitDejeuner:req.body.PrixpetitDejeuner 
                
                ,status: 'Pending' || req.body.status,
                Subtotal: req.body.Subtotal,
                username: user.username,
                email: user.email,
                userId: user._id,
                image:req.body.image,

                timestamp: Date.now()

  })

           console.log("username:", user.username, "email:", user.email, user._id)
        //    console.log("image",image)

            res.redirect ('/booking')
} catch(err) {
            //next(err)

            console.log(err)
            }
    }

exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        BookingModel.editItem
        (req.body.cardId,
            {
                supplement:req.body.supplement,
                total:req.body.total, 
                timestamp: Date.now()
        }).then(()=> res.redirect('/booking'))
        .catch(err =>{
            console.log(err)

        } )
    } else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/booking')
    }
}





exports.postDelete=(req,res,next)=>{
    BookingModel
    .deleteItem(req.body.cardId)    
    .then(()=>res.redirect('/booking'))
    .catch(err =>{

        console.log(err)
    }
        )

}


exports.postDeleteAll=(req,res,next)=>{
    BookingModel
    .deleteAllItem(req.body.cardId) //cardId
    .then(()=>res.redirect('/booking'))
    .catch(err =>
        {               //next(err)

            console.log(err)})

}




     


 

   