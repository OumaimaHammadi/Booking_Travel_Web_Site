const mongoose = require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/booking-travel'



const paymentSchema =mongoose.Schema({
  Civilite:String,
  Prenom:String,
  Nom:String,
  Email:String,
  Portable:String,



  name: String,
  price: Number,
 
  image: String,
  userId:String,
  PreBookingId:String

  

   


})
const Payement = mongoose.model('Payement-Agence',paymentSchema)

exports.getPayementByUser= (userId) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       PreBookingItem.findOne(
            // {userId : userId},

            {PreBookingId:PreBookingId},
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


// exports.getPayementByUser= (id) =>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
//             return PreBookingItem.findById(id).then((items)=>{
//                 mongoose.disconnect()
//                 resolve(items)
//             }).catch(err => reject(err))
               
            

//     })
   
//     })

// }






exports.editInfo=(data)=>{
    return new Promise((resolve,reject) =>{

        mongoose.connect(DB_URL,
            { useNewUrlParser: true , useUnifiedTopology: true})
            .then(()=>{
        let item = new Payement(data)
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