import express from 'express';
import auth from '../middleware/auth.js';   
import  addToCart  from '../controller/add-to-cart.controller.js';
import  removeFromCart  from '../controller/remove-from-cart.js';
import  getCart  from '../controller/get-cart.controller.js';

const cartRouter = express.Router();

cartRouter.post('/add', auth,addToCart);
cartRouter.post('/remove', auth,removeFromCart);
cartRouter.get('/get', auth,getCart);

export default cartRouter;