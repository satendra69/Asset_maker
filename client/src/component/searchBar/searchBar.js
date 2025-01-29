import React, { useState } from 'react';
import './searchBar.scss';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

import httpCommon from '../../http-common';

const types = ['buy', 'rent','Search'];

function SearchBar({ onFilterChange }) {
  const [query, setQuery] = useState({
    type: 'buy',
    city: '',
    typetitle:'',
    price: {
      min: '',
      max: '',
    },
  });

  
  const [searchQuery, setSearchQuery] = useState(''); // State for the search box
  const [searchInput, setSearchInput] = useState(""); 
  const [results, setResults] = useState([]); // State to store API results
  const navigate = useNavigate(); // To handle redirection

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
    if (val === 'Search') {
      setSearchQuery('');
      setResults([]); // Clear search results when switching tabs
    }
  };

  const handleSearchInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchInput(value);

    if (value.trim() === '') {
      setResults([]); // Clear results if the input is empty
      return;
    }
    try {
      // API call to fetch results
      const res = await httpCommon.get(`/list`);
            //return res.data;
            const dataArray = res.data.data;
            
            const filteredResults = dataArray.filter((item) =>
              item.ltg_title && item.ltg_title.toLowerCase().includes(value.toLowerCase())
            );

            setResults(filteredResults);
     
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  // Handle clicking on a result
  const handleResultClick = (result) => {
    window.open(`/Property/${result.propertyUrl}`, "_blank");
    setResults([]);
    setSearchInput("");
   // navigate(`/Property/${result.propertyUrl}`); // Redirect to a specific page based on result ID
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
      setQuery((prev) => ({ ...prev, [name]: value }));
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
        {query.type !== 'Search' && (
          <button className="button2" onClick={handleSearch}>
            <FaSearch size={32} className="text-white" />
          </button>
        )}
       
      </div>
      {/* Default Tab Content */}
      {query.type === 'Search' && (
        <div className="defaultTab">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            style={{width:"321.5px", border:"1px solid #00000066",padding:"10px",borderRadius:"0px 0px 5px 5px"}}
            autoComplete='off'
            onChange={handleSearchInputChange}
          />
          {Array.isArray(results) && results.length > 0 && (
            <ul
              className="searchResults"
              style={{
                width: "340px",
                height: "230px",
                overflow: "scroll",
                border: "1px solid #ddd",
                padding: "5px", 
                borderRadius: "5px", 
                backgroundColor: "#ffffff", 
              }}
            >
              {results.map((result) => (
                <li
                  key={result.RowID}
                  onClick={() => handleResultClick(result)}
                  style={{
                    width: "320px",
                    backgroundColor: "#f0f0f0", 
                    padding: "5px",
                    marginBottom: "3px", 
                    borderRadius: "5px", 
                    wordWrap: "break-word", 
                    overflowWrap: "break-word", 
                    cursor: "pointer",
                  }}
                >
                  {result.ltg_title}
                
                </li>
              ))}
            </ul>
          )}

        </div>
      )}
       {query.type !== 'Search' && (
      <form onSubmit={handleSearch}>
        <select name="city" id="city" onChange={handleInputChange} >
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bengaluru">Bengaluru</option>
         
        </select>
        <div className="defaultTab second">
        <input
          type="text"
          name="typetitle"
          value={searchInput}
          placeholder="Enter a location, project name,"
       //   onChange={handlePriceChange}
          onChange={handleSearchInputChange}
         autoComplete='off'
          style={{width:"365.5px",padding:"19px",borderRadius:"0px 0px 5px 5px"}}
        />
          {Array.isArray(results) && results.length > 0 && (
            <ul
              className="searchResults"
              style={{
                position: "absolute",
                width: "368px",
                height: "230px",
                overflow: "scroll",
                border: "1px solid #ddd",
                padding: "5px", 
                borderRadius: "5px", 
                backgroundColor: "#ffffff", 
                zIndex: "1000",
              }}
            >
              {results.map((result) => (
                <li
                  key={result.RowID}
                  onClick={() => handleResultClick(result)}
                  style={{
                    width: "368px",
                    backgroundColor: "#f0f0f0", 
                    padding: "5px",
                    marginBottom: "3px", 
                    borderRadius: "5px", 
                    wordWrap: "break-word", 
                    overflowWrap: "break-word", 
                    cursor: "pointer",
                  }}
                >
                  {result.ltg_title}
                
                </li>
              ))}
            </ul>
          )}
          </div>
        {/* <input
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
        /> */}
      </form>
       )}
    </div>
  );
}

export default SearchBar;
