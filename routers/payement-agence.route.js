const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const PayementController =require('../controllers/payement-agence.controller')
const authguard = require('./guards/auth.guard')
const check =require('express-validator').check


// router.get('/:id',authguard.isAuth,PayementController.getHotelByid)

router.get('/',authguard.isAuth,PayementController.getAdd)


router.post('/',authguard.isAuth,bodyParsercart,
check('Civilite')
.not()
.isEmpty()
.withMessage('Civilite is required')
,
check('Prenom')
.not()
.isEmpty()
.withMessage('Prénom is required')
,

check('Nom')
.not()
.isEmpty()
.withMessage('Nom is required')
,

check('Email')
.not()
.isEmpty()
.withMessage('Email is required')
.isEmail().withMessage('invalid email format')

,
check('Portable')
.not()
.isEmpty()
.withMessage('Portable is required')
.isLength({min:8}).withMessage('Portable must be 8 number')
,

PayementController.postAdd
)


module.exports = router