const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const PreBookingController =require('../controllers/PreBooking.controller')
const authguard = require('./guards/auth.guard')
const check =require('express-validator').check


router.get('/',authguard.isAuth, PreBookingController.getPreBooking)


router.post('/',authguard.isAuth,bodyParsercart,
check('NbreChambre')
.not()
.isEmpty()
.withMessage('Nbre Chambre is required')
// .isInt({min:1})
// .withMessage('NbreChambre is greater than 0'),
,
check('NbreAdult')
.not()
.isEmpty()
.withMessage('NbreAdult is required')
// 
,
check('NbreEnfant')
.not()
.isEmpty()
.withMessage('NbreEnfant is required')
// .isInt({min:1})
// .withMessage('NbreEnfant is greater than 0')
,

check('NbreNuit')
.not()
.isEmpty()
.withMessage('NbreNuit is required')
// .isInt({min:1})
// .withMessage('NbreNuit is greater than 0')
,

check('Arrivee')
.not()
.isEmpty()
.withMessage('Arrivee is required')
// .isInt({min:1})
// .withMessage('Arrivee is greater than 0')
,

PreBookingController.postPreBooking
)

router.post('/save',authguard.isAuth,bodyParsercart,
check('NbreChambre')
.not()
.isEmpty()
.withMessage('NbreChambre is required')
.isInt({min:1})
.withMessage('NbreChambre is greater than 0'),
check('NbreAdult')
.not()
.isEmpty()
.withMessage('NbreAdult is required')
.isInt({min:1})
.withMessage('NbreAdult is greater than 0'),

check('NbreEnfant')
.not()
.isEmpty()
.withMessage('NbreEnfant is required')
.isInt({min:1})
.withMessage('NbreEnfant is greater than 0'),

check('NbreNuit')
.not()
.isEmpty()
.withMessage('NbreNuit is required')
.isInt({min:1})
.withMessage('NbreNuit is greater than 0'),

check('Arrivee')
.not()
.isEmpty()
.withMessage('Arrivee is required')
.isInt({min:1})
.withMessage('Arrivee is greater than 0'),
PreBookingController.postSave
)




router.post('/delete',authguard.isAuth,bodyParsercart,PreBookingController.postDelete)
router.post('/deleteAll',authguard.isAuth,bodyParsercart,PreBookingController.postDeleteAll)

router.get('/reservation',authguard.isAuth)
//, PreBookingController.postOrders









module.exports=router