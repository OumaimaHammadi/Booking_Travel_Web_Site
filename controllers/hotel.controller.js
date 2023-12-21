const HotelModel = require('../models/hotel.model')

exports.getHotel =(req,res,next)=>{
    HotelModel.getFirstHotel().then(hotel=>{
        res.render('hotel',{
            hotel : hotel ,
            isUser:true,
            validationError: req.flash('validationErrors')[0],
            isAdmin :req.session.isAdmin,
           pageTitle:'Hotel'


            
           

        })

    })
}


exports.getHotelByid =(req,res,next) => {
    //get id 
    //get product
    // render index.ejs
    let id =req.params.id
    HotelModel.getHotelById(id).then((hotel) =>{
    res.render('hotel',{
        hotel : hotel ,
        isUser :true,
        validationError: req.flash('validationErrors')[0],
        isAdmin :req.session.isAdmin,
        pageTitle:'Hotel'



    })

    
    }) 
}
//




