const router = require('express').Router()
const check =require('express-validator').check
const adminController =require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')
const multer =require('multer')


router.get('/add',adminGuard,adminController.getAdd)
router.post('/add',adminGuard,multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now() + "-" + file.originalname)
        }

    })
}).single('image'),
check('image').custom((value,{req})=>{
    if(req.file) return true
    else throw 'image is required'

}),
check('name')
.not()
.isEmpty()
.withMessage('name is required'),
check('price')
.not()
.isEmpty()
.withMessage('price is required'),
check('category')
.not()
.isEmpty()
.withMessage('category is required'),
check('description')
.not()
.isEmpty()
.withMessage('description is required'),
check('PrixAllinclusive')
.not()
.isEmpty()
.withMessage('Prix All inclusive is required'),
check('PrixDemiPension')
.not()
.isEmpty()
.withMessage('Prix Demi Pension is required'),
check('PrixpetitDejeuner')
.not()
.isEmpty()
.withMessage('Prix petit Déjeuner is required')


,adminController.postAdd)

router.get('/reservation',adminGuard,adminController.getReservations)


module.exports =router