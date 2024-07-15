import React, { useContext } from 'react';
import './PetItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const PetItem = ({ image, name, price, desc, id, category, token, userId }) => {
    const { cartItems, addToCart, removeFromCart, url,  } = useContext(StoreContext);
    // Destructure user object to extract userId

    return (
        <div className='pet-item'>
            <div className='pet-item-img-container'>
                <img className='pet-item-image' src={`${url}/images/${image}`} alt='' />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                ) : (
                    <div className='pet-item-counter'>
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt='' />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt='' />
                    </div>
                )}
            </div>
            <div className='pet-item-info'>
            
                <div className='pet-item-name-rating'>
                    <p>{name}</p> <img src={assets.rating_starts} alt='' />
                </div>
                <p className='pet-item-desc'>{desc}</p>
                <p className='pet-item-price'>${price}</p>
                <p className='pet-item-category'>{category}</p>
                <p className='added-by'>Added by: {userId}</p>
            </div>
        </div>
    );
};

export default PetItem;
