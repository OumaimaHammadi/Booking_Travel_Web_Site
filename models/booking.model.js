const mongoose = require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/booking-travel'
//const DB_URL='mongodb+srv://hammadiioumaima_db_user:vFSKsZyIxlriCEPa@booking-travel-cluster.ucag5ux.mongodb.net/'




const BookingSchema= mongoose.Schema({
    username:String,
    email:String,
    name:String,
    price:Number,
    total:Number,
    NbreChambre:Number,
    NbreAdult:Number,
    NbreEnfant:Number,
    NbreNuit:Number,
    ChildAge:Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Arrivee: {
    type: Date,
    required: true
  },

    Departure: {
        type: Date,
        required: true
    },
    PreBookingId:String,
    timestamp:String,
    supplement:String,
    PrixAllinclusive:Number,
    PrixDemiPension:Number,
    PrixpetitDejeuner:Number,
    status:String,
    Subtotal:Number,
    image:String

})
const BookingItem =mongoose.model('booking',BookingSchema)

exports.addNewBooking= (data)=>{
    return new Promise((resolve,reject)=>{
mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    let item = new  BookingItem(data)
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
exports.getBookingByUser= (userId) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       BookingItem.find(
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
       BookingItem.updateOne({_id:id} ,newData)
    
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
       BookingItem.findByIdAndDelete({_id:id})
    
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
       BookingItem.deleteMany()
    
    ).then(() =>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}



exports.getAllBooking= () =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       BookingItem.find({})
    
    ).then(items =>{
            mongoose.disconnect()
            resolve(items)
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}


exports.getReservationBycategory = (status) => {
    //connect db
    return new Promise((resolve,reject)=>{

        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return  BookingItem.find({status:status}).then((bookings)=>{
                mongoose.disconnect()
                resolve(bookings)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}


exports.getBookingById = (id) => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return BookingItem.findById(id).then((item)=>{
                mongoose.disconnect()
                resolve(item)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}