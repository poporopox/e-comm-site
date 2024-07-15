import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import { menu_list } from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [pet_list, setPet_List] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Add userId state

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);
  
  useEffect(() => {
    console.log("Token updated:", token);

    // Decode token and set userId
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } else {
      setUserId(null);
    }
  }, [token]);

  const fetchPetList = async () => {
    const response = await axios.get(url + "/api/pet/list");
    setPet_List(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchPetList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const loginUser = async (userData) => {
    try {
      if (userData) {
        setUser(userData);
        console.log("User logged in:", userData);
      } else {
        console.error("Invalid userData:", userData);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = pet_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    url,
    pet_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    user,
    token,
    userId, // Provide userId in context
    setToken,
    loadCartData,
    setCartItems,
    loginUser,
    logoutUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
