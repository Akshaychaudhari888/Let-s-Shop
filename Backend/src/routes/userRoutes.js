import express from 'express';
import login from '../controller/login-user.Controller.js';
import register from '../controller/register-user.Controller.js';

const router = express.Router();

router.post("/login",login);
router.post('/register',register)

export default router;