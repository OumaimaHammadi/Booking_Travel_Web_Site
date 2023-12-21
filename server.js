const express = require('express')
const path = require('path')
const app = express()
const homeRouter = require('./routers/home.route')
const authRouter = require('./routers/auth.route')
const HotelRouter = require('./routers/hotel.route')
const PreBookingRouter= require('./routers/PreBooking.route')
const adminRouter= require('./routers/admin.route')
const ReservationRouter=require('./routers/reservations.router')
const payementAgence = require('./routers/payement-agence.route')
const thankRouter =require('./routers/thanks.route')



const session =require('express-session')
const StoreSession =require('connect-mongodb-session')(session)
const flash =require('connect-flash')


app.use(express.static(path.join(__dirname ,'assetes')))
app.use(express.static(path.join(__dirname ,'images')))
app.use(express.static(path.join(__dirname ,'stylesheets')))
app.use('/photos',express.static('photos'))




app.use(flash())


const STORE = new StoreSession({
     //uri :'mongodb://localhost:27017/online-shop',
   uri :'mongodb://127.0.0.1:27017/booking-travel',


   
    collection :'sessions'

})

app.use(session({
    secret:'this is my secret to hash express session ....',
    saveUninitialized :true,
    resave: false,
    store:STORE 
}))



app.set('view engine','ejs')
app.set('views','views') //default

app.use('/', homeRouter)
app.use('/', authRouter )
app.use('/hotel',HotelRouter)
app.use('/pre-booking',PreBookingRouter)
app.use('/admin',adminRouter)
app.use('/reservation',ReservationRouter)
app.use('/payement-agence',payementAgence)
app.use('/thanks',thankRouter)






// app.get('/error',(req,res,next)=>{
//     res.status(500)
//     res.render('error',{

//         isUser :req.session.userId ,
//         isAdmin :req.session.isAdmin,
//         pageTitle:'Error 500'


//     })
// })

// app.use((error,req,res,next)=>{
//     res.redirect('/error')
// })





app.get('/not-admin',(req,res,next)=>{
    res.status(403)

    res.render('not-admin',{

        isUser :req.session.userId ,
        isAdmin :false,
        pageTitle:'not-admin'


    })
})


app.listen(5000,(err)=>{

    console.log('Server is 5000 okk')

})
