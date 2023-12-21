const mongoose = require('mongoose')
//const DB_URL='mongodb://localhost:27017/online-shop'
const DB_URL='mongodb://127.0.0.1:27017/booking-travel'



const PreBookingSchema= mongoose.Schema({
    name:String,
    price:Number,

    NbreChambre:Number,
    NbreAdult:Number,
    NbreEnfant:Number,
    NbreNuit:Number,
    Arrivee:Number,
    userId:String,
    hotelId:String,

    timestamp:String,
    
    PrixAllinclusive:Number,
    PrixDemiPension:Number,
    PrixpetitDejeuner:Number,
    image:String
})
const PreBookingItem =mongoose.model('PreBooking',PreBookingSchema)

exports.addNewPreBooking= (data)=>{
    return new Promise((resolve,reject)=>{
mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    let item = new  PreBookingItem(data)
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
exports.getPreBookingByUser= (userId) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       PreBookingItem.find(
            {userId : userId},
            {},
            {sort : {timestamp: 1 }}
          
            )
    
    ).then(items =>{
            mongoose.disconnect()
            resolve(items)
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}

//modifier&&save
exports.editItem=(id,newData)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       PreBookingItem.updateOne({_id:id} ,newData)
    
    ).then(items =>{
            mongoose.disconnect()
            resolve(items)
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}
//deleteOne
exports.deleteItem=(id)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       PreBookingItem.findByIdAndDelete({_id:id})
    
    ).then(() =>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}

//deleteAll
exports.deleteAllItem=(id)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       PreBookingItem.deleteMany()
    
    ).then(() =>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}



/// Voir Hotels by id
exports.getHotelById = (id) => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return PreBookingItem.findById(id).then((hotels)=>{
                mongoose.disconnect()
                resolve(hotels)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}