const mongoose = require('mongoose')
//const DB_URL='mongodb://localhost:27017/online-shop'
const DB_URL='mongodb://127.0.0.1:27017/booking-travel'



const orderSchema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    addresse:String,
    total:Number,
    status:String,
    cardId:String,
    orderId:String,
    timestamp:String
})
const orderItem = mongoose.model('m-reservation',orderSchema)


exports.getItemsByOrders=(orderId) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
        orderItem.find(
            {orderId: orderId },
            {},
            {sort : {timestamp: 1 }}
          
            )
    
    ).then(orders =>{
            mongoose.disconnect()
            resolve(orders)
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}