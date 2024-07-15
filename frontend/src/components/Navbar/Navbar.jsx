import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { token,setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]); // Clear search results if search query is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/pet/list?search=${searchQuery}`);
      const data = response.data.data || [];
      const filteredResults = data.filter(pet =>
        pet && pet.name && pet.image && pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults); // Set search results with filtered data
    } catch (error) {
      console.error("Error fetching pet list:", error);
      setSearchResults([]); // Clear search results on error
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" className="active">
          home
        </Link>
        <a href="#explore-menu">menu</a>
        <a href="#app-download">mobile app</a>
        <a href="#footer">contact us</a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt=""
          onClick={() => setShowSearch(!showSearch)}
          className="search-icon"
        />
        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
            {/* Search results dropdown */}
            <div className="search-results">
              {searchResults.map((pet) => (
                <div key={pet._id} className="search-item">
                  <div className="pet-name">{pet.name}</div>
                  <img
                    
                    alt={pet.name}
                    className="pet-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="signin-button">sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
