const mongoose = require('mongoose')
//const DB_URL = 'mongodb://localhost:27017/online-shop'
const DB_URL='mongodb://127.0.0.1:27017/booking-travel'



const hotelSchema =mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  PrixAllinclusive:Number,
  PrixDemiPension:Number,
  PrixpetitDejeuner:Number


   


})
const Hotel = mongoose.model('hotel',hotelSchema)
///get All Product
exports.getAllHotels = () => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Hotel.find({}).then((hotels)=>{
                mongoose.disconnect()
                resolve(hotels)}).catch(err => reject(err))        

    })
   
    })
    //get products
    //disconnect db
}


///Filtrage des products
exports.getHotelBycategory = (category) => {
    //connect db
    return new Promise((resolve,reject)=>{

        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Hotel.find({category:category}).then((hotels)=>{
                mongoose.disconnect()
                resolve(hotels)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}


/// Voir Product by id
exports.getHotelById = (id) => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Hotel.findById(id).then((hotels)=>{
                mongoose.disconnect()
                resolve(hotels)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}


exports.getFirstHotel = () => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Hotel.findOne({}).then((hotel)=>{ ///product au lieu de products
                mongoose.disconnect()
                resolve(hotel)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}
//le meme nom 


//upload image par l'Admine
exports.editImage=(data)=>{
    return new Promise((resolve,reject) =>{

        mongoose.connect(DB_URL,
            { useNewUrlParser: true , useUnifiedTopology: true})
            .then(()=>{
        let item = new Hotel(data)//
        return item.save()
    
    }).then(()=>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}


