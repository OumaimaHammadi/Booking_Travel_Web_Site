const PreBookingModel =require('../models/PreBooking.model')
const validationResult = require('express-validator').validationResult


exports.getPreBooking = (req,res,next) =>{
    PreBookingModel.getPreBookingByUser(req.session.userId).then((items) => {
   res.render('PreBooking', { 
         items:items,
         validationError: req.flash('validationErrors')[0],
         isUser : true,
         isAdmin :req.session.isAdmin,
         pageTitle:'PreBooking'


        })

 
    }).catch(err => {
        //next(err)

        console.log(err)

    }
       
    )
}


exports.postPreBooking=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        PreBookingModel.addNewPreBooking ({
                name:req.body.name ,
                price :req.body.price,
                image:req.body.image,

                hotelId:req.body.hotelId,
                userId: req.session.userId,

                NbreChambre:req.body.NbreChambre ,
                NbreAdult:req.body.NbreAdult ,
                NbreEnfant:req.body.NbreEnfant ,
                NbreNuit:req.body.NbreNuit ,
                Arrivee:req.body.Arrivee ,

                PrixAllinclusive:req.body.PrixAllinclusive ,
                PrixDemiPension:req.body.PrixDemiPension ,
                PrixpetitDejeuner:req.body.PrixpetitDejeuner ,




              
                timestamp: Date.now()
        }).then(()=>{
            res.redirect ('/pre-booking')
        }).catch(err => {
            //next(err)

            console.log(err)
            })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo )
    }

}

exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        PreBookingModel.editItem
        (req.body.cardId,
            {
           
                NbreChambre:req.body.NbreChambre,
                NbreAdult:req.body.NbreAdult ,
                NbreEnfant:req.body.NbreEnfant ,
                NbreNuit:req.body.NbreNuit ,
                Arrivee:req.body.Arrivee , 
                timestamp: Date.now()
        }).then(()=> res.redirect('/pre-booking'))
        .catch(err =>{
            //next(err)
            console.log(err)

        } )
    } else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/pre-booking')
    }
}
exports.postDelete=(req,res,next)=>{
    PreBookingModel
    .deleteItem(req.body.cardId)    //cardId
    .then(()=>res.redirect('/pre-booking'))
    .catch(err =>{
        //next(err)

        console.log(err)
    }
        )

}


exports.postDeleteAll=(req,res,next)=>{
    PreBookingModel
    .deleteAllItem(req.body.cardId) //cardId
    .then(()=>res.redirect('/pre-booking'))
    .catch(err =>
        {               //next(err)

            console.log(err)})

}





     
      


//publication des données de Prebooking dans Reservation


 

    exports.postOrders=(req,res,next)=>{
        if(validationResult(req).isEmpty()){
            orderModel.addNewOrders({
                name:req.body.name ,
                price :req.body.price,
                image:req.body.image,

                NbreChambre:req.body.NbreChambre ,
                NbreAdult:req.body.NbreAdult ,
                NbreEnfant:req.body.NbreEnfant ,
                NbreNuit:req.body.NbreNuit ,
                Arrivee:req.body.Arrivee ,
                addresse:req.body.addresse,
                
                status :req.body.status,
                total: req.body.total,

                cardId : req.body.cardId,
                orderId: req.session.orderId, //id de cart
                timestamp: Date.now(),

                PrixAllinclusive:req.body.PrixAllinclusive ,
                PrixDemiPension:req.body.PrixDemiPension ,
                PrixpetitDejeuner:req.body.PrixpetitDejeuner 
            })
            .then(() => res.redirect('/reservation')) //
                
            .catch(err =>{
                console.log(err)
        
        res.redirect('/pre-booking') 
            } )
            
        } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/pre-booking') 
        }
          
        
    

     }








