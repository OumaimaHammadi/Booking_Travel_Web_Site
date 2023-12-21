
const hotelsModel = require('../models/hotel.model') // je fais  l'inportation de fichier product.model


exports.getHome = (req,res,next) => {
let category = req.query.category

let validCategory =["Hammamet",'Djerda','Mahdia','Monastir','Sousse']

let hotelsPromise
if (category && validCategory.includes((category))) 
    hotelsPromise = hotelsModel.getHotelBycategory(category)

else

    hotelsPromise = hotelsModel.getAllHotels()

    hotelsPromise.then( hotels =>{
        res.render('index',{
        hotels : hotels ,
        isUser :  req.session.userId,
        isAdmin :req.session.isAdmin,
        pageTitle:'Home'
    

        }) 
})  



  

    

    


 
}
