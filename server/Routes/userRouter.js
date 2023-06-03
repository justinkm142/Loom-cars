import { Router } from "express";
import { userAuth } from "../Middleware/userAuth.js";

import {
  signup,
  login,
  otpLogin,
  userDetails,
  editUserDetails,
} from "../Controller/user/LoginSignup.js";

import {
  hostVehicle,
  viewVehicle,
  carList_home,
  vehicleDetails,
  activeDayChange,
  carList_search,
  editVehicle,
  deleteVehicle
} from "../Controller/user/Vehicle.js";

import {
  booking,
  bookingList,
  cancelBooking,
  bookingListForHost,
  confirmBooking,
  handleVehicle,
  bookingDetails,
  bookingDetailsComplete
} from "../Controller/user/Booking.js"

import { paymentConfirm } from "../Controller/user/Payment.js";

const router = Router();







//user Side 

router.post("/signup", signup);
router.post("/signin", login);
router.post("/otplogin", otpLogin);


router.get("/", carList_home);
router.get("/search", carList_search);
router.get("/vehicleDetails", vehicleDetails);


router.route("/userDetails").get(userDetails)
                            .patch(userAuth, editUserDetails);

router.route("/booking").post(userAuth, booking)
                        .patch(userAuth, cancelBooking)
                        .get(userAuth, bookingDetails)

router.route("/editVehicle").get(userAuth, vehicleDetails)
                            .patch(userAuth, editVehicle)
                            .delete(userAuth, deleteVehicle)
                      
                      

router.get("/booking/list",userAuth, bookingList);

router.post("/paymentConfirm", paymentConfirm);

router.get("/booking/bookingDetails",userAuth, bookingDetailsComplete);


//host Side

router.route("/hostVehicle").get(userAuth, viewVehicle)
                            .post(userAuth, hostVehicle);

router.post("/activeDays",userAuth, activeDayChange);
router.route("/hostBookingList").get(userAuth, bookingListForHost)
                                .patch(userAuth, handleVehicle)

router.patch("/confirmBooking",userAuth,confirmBooking)





export default router;
