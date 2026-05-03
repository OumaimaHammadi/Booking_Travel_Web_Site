const mongoose = require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/booking-travel'
//const DB_URL='mongodb+srv://hammadiioumaima_db_user:vFSKsZyIxlriCEPa@booking-travel-cluster.ucag5ux.mongodb.net/'




const ReservationSchema= mongoose.Schema({
    name:String,
    price:Number,

    NbreChambre:Number,
    NbreAdult:Number,
    NbreEnfant:Number,
    ChildAge:Number,

  Arrivee: {
    type: Date,
    required: true
  },

  Departure: {
    type: Date,
    required: true
  },
      userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
    hotelId:String,

    timestamp:String,
    
    PrixAllinclusive:Number,
    PrixDemiPension:Number,
    PrixpetitDejeuner:Number,

    // Subtotal:Number,
    // NbreNuit:Number,

    image:String
})
const reservationItem =mongoose.model('reservation',ReservationSchema)

exports.addNewReservation= (data)=>{
    return new Promise((resolve,reject)=>{
mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    let item = new  reservationItem(data)
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
exports.getReservationByUser= (userId) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true})
        .then(()=>
       reservationItem.find(
            {userId : userId},
            {},
            {sort : {timestamp: 1 }}
          
            ).populate('userId')
    
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
       reservationItem.updateOne({_id:id} ,newData)
    
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
       reservationItem.findByIdAndDelete({_id:id})
    
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
       reservationItem.deleteMany()
    
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
            return reservationItem.findById(id).then((hotels)=>{
                mongoose.disconnect()
                resolve(hotels)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}