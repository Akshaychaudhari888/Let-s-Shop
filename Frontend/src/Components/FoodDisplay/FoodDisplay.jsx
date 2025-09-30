import { useContext } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from "../../Context/StoreContext.jsx";
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    console.log('Rendering FoodDisplay with category:', food_list);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if (category === 'All' || category === item.category) {
                        return (
                            <FoodItem
                                key={item._id} 
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null; 
                })}
            </div>
        </div>
    );
};

FoodDisplay.propTypes = {
    category: PropTypes.string.isRequired
};

export default FoodDisplay;
