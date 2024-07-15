import React, { useContext, useEffect } from 'react';
import './petDisplay.css';
import PetItem from '../PetItem/PetItem';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import Add from '../Add/Add';

const PetDisplay = ({ category }) => {
  const { pet_list, cartItems, addToCart, token,userId  } = useContext(StoreContext);

  

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  // Filter out items that are already in the cart
  const filteredPetList = pet_list.filter(item => !cartItems[item._id]);

  const admin = async () => {
    try {
      
      
      // Make an HTTP POST request to trigger the admin action
      await axios.post("http://localhost:4000/admin", { userId } );
      console.log('Admin action recorded successfully.');
    } catch (error) {
      console.error('Error recording admin action:', error);
      console.log(userId)
    }
  };

  return (
    <div className='pet-display' id='pet-display'>
      <h2>Pets near you</h2>
      <div className='pet-display-list'>
        {filteredPetList.map((item) => {
          if (item && (category === 'All' || category === item.category)) {
            return (
              <div key={item._id}>
                <PetItem
                  image={item.image}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  category={item.category}
                  userId={item.userId}
                />
                {token && (
                  <button className='handle-add-to-cart' onClick={() => handleAddToCart(item._id)}>Adopt</button>
                )}
              </div>
            );
          }
        })}
      </div>
      {token && (
        
        < Add userId={userId} />
      )}
    </div>
  );
};

export default PetDisplay;
