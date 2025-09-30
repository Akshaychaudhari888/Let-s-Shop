import { useContext } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);

  const navigate=useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className='cart-item-titles cart-items-item'>
                <img src={url+"api/images/"+item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price.toFixed(2)}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                <button className='remove' onClick={() => removeFromCart(item._id)}>Remove</button>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{totalAmount.toFixed(2)}</b>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECK OUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo code' />
              <button className='cart-button'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
