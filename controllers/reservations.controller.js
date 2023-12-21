const PreBookingModel =require('../models/reservation.model')
const validationResult = require('express-validator').validationResult


exports.getPreBooking = (req,res,next) =>{
    PreBookingModel.getPreBookingByUser(req.session.userId).then((items) => {
   res.render('Reservation', { 
         items:items,
         validationError: req.flash('validationErrors')[0],
         isUser : true,
        isAdmin :req.session.isAdmin,
         pageTitle:'Reservation'


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
                NbreChambre:req.body.NbreChambre ,
                total:req.body.total,
                price :req.body.price,
                productId : req.body.productId,
                userId: req.session.userId,
                timestamp: Date.now(),
                supplement:req.body.supplement,

                PrixAllinclusive:req.body.PrixAllinclusive ,
                PrixDemiPension:req.body.PrixDemiPension ,
                PrixpetitDejeuner:req.body.PrixpetitDejeuner 
                

                

        }).then(()=>{
            res.redirect ('/reservation')
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
                //PrixAllinclusive:req.body.PrixAllinclusive,


                supplement:req.body.supplement,
                total:req.body.total
                , 
        timestamp: Date.now()
        }).then(()=> res.redirect('/reservation'))
        .catch(err =>{
            //next(err)
            console.log(err)

        } )
    } else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/reservation')
    }
}
exports.postDelete=(req,res,next)=>{
    PreBookingModel
    .deleteItem(req.body.cardId)    //cardId
    .then(()=>res.redirect('/reservation'))
    .catch(err =>{
        //next(err)

        console.log(err)
    }
        )

}


exports.postDeleteAll=(req,res,next)=>{
    PreBookingModel
    .deleteAllItem(req.body.cardId) //cardId
    .then(()=>res.redirect('/reservation'))
    .catch(err =>
        {               //next(err)

            console.log(err)})

}




     


 

    exports.postOrders=(req,res,next)=>{
        if(validationResult(req).isEmpty()){
            orderModel.addNewOrders({
                name:req.body.name ,
                price :req.body.price,

                NbreChambre:req.body.NbreChambre ,

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
            .then(() =>{res.redirect('/reservation')
            console.log(" PrixAllinclusive:",req.body.PrixAllinclusive)

        } 
            ) //
                
            .catch(err =>{
                console.log(err)
        
        res.redirect('/pre-booking') 
            } )
            
        } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/pre-booking') 
        }
          
        
    

     }








