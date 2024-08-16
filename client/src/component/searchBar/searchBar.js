import React, { useState } from 'react';
import './searchBar.scss';
import { FaSearch } from 'react-icons/fa';

const types = ['buy', 'rent'];

function SearchBar({ onFilterChange }) {
  const [query, setQuery] = useState({
    type: 'buy',
    city: '',
    price: {
      min: '',
      max: '',
    },
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      price: { ...prev.price, [name]: value },
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange(query);
  };

  return (
    <div className="searchBar">
      <div className="type">
        <div className="left">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => switchType(type)}
              className={query.type === type ? 'active' : ''}
            >
              {type}
            </button>
          ))}
        </div>
        <button className="button2" onClick={handleSearch}>
          <FaSearch size={32} className="text-white" />
        </button>
      </div>
      <form onSubmit={handleSearch}>
        <select name="city" id="city" onChange={handleInputChange}>
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Tirupati">Tirupati</option>
        </select>
        <input
          type="number"
          name="min"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handlePriceChange}
        />
        <input
          type="number"
          name="max"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handlePriceChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;
