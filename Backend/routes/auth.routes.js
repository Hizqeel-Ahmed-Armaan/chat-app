import express from 'express';
import { login,signup,logout,check} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/check',protectRoute, check)

export default router;