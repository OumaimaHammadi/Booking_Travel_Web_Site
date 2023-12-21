const router = require('express').Router()
const thankController = require('../controllers/thanks.controller')


const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const authguard = require('./guards/auth.guard')

router.get('/',authguard.isAuth,thankController.getFile)





module.exports = router