const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const BookingController =require('../controllers/booking.controller')
const authguard = require('./guards/auth.guard')
const check =require('express-validator').check



router.get('/',authguard.isAuth,BookingController.getBooking)


router.post('/',authguard.isAuth,bodyParsercart,BookingController.postBooking)

router.post('/save',authguard.isAuth,bodyParsercart,
check('supplement')
.not()
.isEmpty()
.withMessage('supplement is required')

,BookingController.postSave
)


router.post('/delete',authguard.isAuth,bodyParsercart,BookingController.postDelete)
router.post('/deleteAll',authguard.isAuth,bodyParsercart,BookingController.postDeleteAll)









module.exports=router