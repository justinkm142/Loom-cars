import {Router} from 'express'
import {adminAuth} from '../Middleware/adminAuth.js'

import {adminlogin} from '../Controller/admin/Login.js'
import {userList, userBlock} from '../Controller/admin/Usermanagement.js'
import {
      verifyCars, 
      verifyCarStatausUpdate, 
      getCarList
} from '../Controller/admin/CarManagement.js'
import {
      getBookingList,
      handleBooking,
      bookingDetails
} from '../Controller/admin/Bookingmanagement.js'
import {dashboardData} from '../Controller/admin/Dashboard.js'
import {getReport} from '../Controller/admin/ReportManagement.js'



const router = Router()


router.post("/login", adminlogin);

router.route("/users")  .get(adminAuth, userList)
                        .patch(adminAuth, userBlock);

router.route("/dashboard") .get(adminAuth, dashboardData)


router.route("/verifyCars").get(adminAuth , verifyCars)
                           .patch(adminAuth , verifyCarStatausUpdate);

router.get('/cars',adminAuth,getCarList)


router.route('/booking').get(adminAuth,getBookingList)
                        .patch(handleBooking)

router.get('/booking/bookingDetails',adminAuth,bookingDetails)

router.route('/report').get(adminAuth,getReport)


// router.get('/booking',adminAuth,getBookingList)
//       .patch('/booking',handleBooking)
      



export default router