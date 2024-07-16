import { useState } from "react";
import "./searchBar.scss";
import { FaSearch } from "react-icons/fa";
const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        <div className="left">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => switchType(type)}
              className={query.type === type ? "active" : ""}
            >
              {type}
            </button>
          ))}
        </div>
        <button className="button2">
          <FaSearch size={32} className="text-white" />
        </button>
      </div>
      <form>
        {/* <input type="text" name="location" placeholder="City Location" /> */}
        <select name="city gap-3" id="city">
          <option value="">Select City</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="bangalore">Bangalore</option>
          <option value="tirupati">Tirupati</option>
        </select>
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
      </form>
    </div>
  );
}

export default SearchBar;
