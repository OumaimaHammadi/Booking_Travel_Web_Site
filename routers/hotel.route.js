const router = require('express').Router()
const HotelController = require('../controllers/hotel.controller')

router.get('/',HotelController.getHotel)


router.get('/:id',HotelController.getHotelByid)



module.exports = router