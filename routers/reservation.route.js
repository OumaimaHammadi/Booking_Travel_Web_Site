const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const reservationController =require('../controllers/reservation.controller')
const authguard = require('./guards/auth.guard')


router.get('/',authguard.isAuth, reservationController.getreservation)
router.post('/',authguard.isAuth,bodyParsercart,reservationController.postReservation)

router.post('/delete',authguard.isAuth,bodyParsercart,reservationController.postDelete)
router.post('/deleteAll',authguard.isAuth,bodyParsercart,reservationController.postDeleteAll)











module.exports=router