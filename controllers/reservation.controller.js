const reservationModel =require('../models/reservation.model')
const validationResult = require('express-validator').validationResult


exports.getreservation = (req,res,next) =>{
    reservationModel.getReservationByUser(req.session.userId).then((items) => {
   res.render('reservation', { 
         items:items,
         validationError: req.flash('validationErrors')[0],
         isUser : true,
         isAdmin :req.session.isAdmin,
         pageTitle:'Reservation'


        })

 
    }).catch(err => {
    

        console.log(err)

    }
       
    )
}

exports.postReservation = (req, res, next) => {
    console.log('hotelId', req.body.hotelId)


    if (validationResult(req).isEmpty()) {

        // 1️⃣ Récupérer et convertir les dates
        // const Arrivee = new Date(req.body.Arrivee)
        // const Departure = new Date(req.body.Departure)

        // 2️⃣ Calcul du nombre de nuits
        // const diffTime = Departure - Arrivee
        // const NbreNuit = diffTime

        reservationModel.addNewReservation({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,

            hotelId: req.body.hotelId,
            userId: req.session.userId,

            NbreChambre: req.body.NbreChambre,
            NbreAdult: req.body.NbreAdult,
            NbreEnfant: req.body.NbreEnfant,
            ChildAge:req.body.ChildAge,


            Arrivee: req.body.Arrivee,
            Departure: req.body.Departure,
            //NbreNuit: Departure - Arrivee, 

          

            // Subtotal: req.body.Subtotal,
            PrixAllinclusive: req.body.PrixAllinclusive,
            PrixDemiPension: req.body.PrixDemiPension,
            PrixpetitDejeuner: req.body.PrixpetitDejeuner,
            
            timestamp: Date.now()
        })
        .then(() => {
            res.redirect('/reservation')
        })
        .catch(err => {
            console.log(err)
        })

    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

// exports.postReservation=(req,res,next)=>{
//     console.log('hotelId',req.body.hotelId)
//     if(validationResult(req).isEmpty()){
//         const diffTime = Departure - Arrivee;
//         const NbreNuit = diffTime / (1000 * 60 * 60 * 24);

//         reservationModel.addNewReservation({
//                 name:req.body.name ,
//                 price :req.body.price,
//                 image:req.body.image,

//                 hotelId:req.body.hotelId,
//                 userId: req.session.userId,

//                 NbreChambre:req.body.NbreChambre ,
//                 NbreAdult:req.body.NbreAdult ,
//                 NbreEnfant:req.body.NbreEnfant ,
//                 NbreNuit:req.body.NbreNuit ,

//                 Arrivee:req.body.Arrivee ,
//                 Departure:req.body.Departure,

//                 Total:req.body.Total,
//                 PrixAllinclusive:req.body.PrixAllinclusive ,
//                 PrixDemiPension:req.body.PrixDemiPension ,
//                 PrixpetitDejeuner:req.body.PrixpetitDejeuner ,
                
//                 timestamp: Date.now()

//         }).then(()=>{
//             res.redirect ('/reservation')
//         }).catch(err => {
//             //next(err)

//             console.log(err)
//             })
//     }else{
//         req.flash('validationErrors',validationResult(req).array())
//         res.redirect(req.body.redirectTo )
//     }

// }

exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        reservationModel.editItem
        (req.body.cardId,
            {
           
                NbreChambre:req.body.NbreChambre,
                NbreAdult:req.body.NbreAdult ,
                NbreEnfant:req.body.NbreEnfant ,
                NbreNuit:req.body.NbreNuit ,
                Arrivee:req.body.Arrivee , 
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
    reservationModel
    .deleteItem(req.body.cardId)    //cardId
    .then(()=>res.redirect('/reservation'))
    .catch(err =>{
        //next(err)

        console.log(err)
    }
        )

}


exports.postDeleteAll=(req,res,next)=>{
    reservationModel
    .deleteAllItem(req.body.cardId) 
    .then(()=>res.redirect('/reservation'))
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
                Departure:req.body.Departure ,


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
        
        res.redirect('/reservation') 
            } )
            
        } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/reservation') 
        }
          
        
    

     }








