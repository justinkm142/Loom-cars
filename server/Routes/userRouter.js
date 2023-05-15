import {Router} from 'express'
import {userAuth} from '../Middleware/userAuth.js'

import {signup,login,otpLogin, userDetails} from '../Controller/user/LoginSignup.js'
import { 
      hostVehicle,
      viewVehicle,
      carList_home, 
      vehicleDetails, 
      activeDayChange, 
      booking, 
      carList_search
} from '../Controller/user/Vehicle.js'
import {paymentConfirm} from '../Controller/user/Payment.js'
const router = Router()






// const add_image = upload.array('image', 12)

router.post('/signup',signup);
router.post('/signin',login);
router.post('/otplogin',otpLogin);
router.get('/hostVehicle',userAuth, viewVehicle)
      .post('/hostVehicle',userAuth, hostVehicle)
router.get('/vehicleDetails', vehicleDetails)

router.get('/',carList_home)

router.get('/search',carList_search)

router.get('/userDetails',userDetails)

router.post('/activeDays', activeDayChange)

router.post('/booking',booking )

router.post('/paymentConfirm', paymentConfirm)



export default router