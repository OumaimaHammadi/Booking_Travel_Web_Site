const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const PreBookingController =require('../controllers/reservations.controller')
const authguard = require('./guards/auth.guard')
const check =require('express-validator').check


router.get('/',authguard.isAuth, PreBookingController.getPreBooking)
 //get verify


router.post('/',authguard.isAuth,bodyParsercart,
// check('supplement')
// .not()
// .isEmpty()
// .withMessage('supplement is required')
//,
PreBookingController.postPreBooking
)

router.post('/save',authguard.isAuth,bodyParsercart,
// check('supplement')
// .not()
// .isEmpty()
// .withMessage('supplement is required')

// ,
PreBookingController.postSave
)


router.post('/delete',authguard.isAuth,bodyParsercart,PreBookingController.postDelete)
router.post('/deleteAll',authguard.isAuth,bodyParsercart,PreBookingController.postDeleteAll)
router.get('/reservation',authguard.isAuth, PreBookingController.postOrders)









module.exports=router