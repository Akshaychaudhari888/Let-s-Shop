import { useContext } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import './FoodItem.css';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);
    console.log('cartItems:', cartItems);

    const itemCount = cartItems[id] || 0;

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url+"api/images/"+image} alt={name} />
                {
                    itemCount === 0
                        ? <img 
                            className='add' 
                            onClick={() => addToCart(id)} 
                            src={assets.add_icon_white} 
                            alt='Add to cart' 
                          />
                        : <div className='food-item-counter'>
                            <img 
                                onClick={() => removeFromCart(id)} 
                                src={assets.remove_icon_red} 
                                alt='Remove from cart' 
                            />
                            <p>{itemCount}</p>
                            <img 
                                onClick={() => addToCart(id)} 
                                src={assets.add_icon_green} 
                                alt='Add more' 
                            />
                          </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='Rating stars' />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

FoodItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default FoodItem;
