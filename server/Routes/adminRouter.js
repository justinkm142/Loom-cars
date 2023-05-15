import {Router} from 'express'
import {adminAuth} from '../Middleware/adminAuth.js'

import {adminlogin} from '../Controller/admin/Login.js'
import {userList, userBlock} from '../Controller/admin/Usermanagement.js'
import {verifyCars, verifyCarStatausUpdate, getCarList} from '../Controller/admin/CarManagement.js'
import {getBookingList} from '../Controller/admin/Bookingmanagement.js'

const router = Router()


router.post('/login',adminlogin);
router.get('/users',adminAuth,userList)
      .patch('/users',adminAuth,userBlock)
router.get('/verifyCars',adminAuth,verifyCars)
      .patch('/verifyCars',adminAuth,verifyCarStatausUpdate)
router.get('/cars',adminAuth,getCarList)
router.get('/booking',getBookingList)
      



export default router