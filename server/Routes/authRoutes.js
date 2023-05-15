import {Router} from 'express'
import {verifyAdmin} from '../Controller/authController.js'

const router = Router()


router.get('/admin',verifyAdmin);
// router.get('/user',verifyUser);


export default router