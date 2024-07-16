import React from "react";
import "./newhero.css";
import { Building, Home, Search } from "lucide-react";

function NewHero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="top ">
          <div className="left">
            <h2>
              Find Your Perfect
              <br /> Property with Us
            </h2>
            <p>
              Discover Your Dream Property with Us - Where Perfect
              <br /> Meets Possible in Every Home.
            </p>
          </div>
          <div className="right">
            <div className="button">
              <div className="leftButton">Rent</div>
              <div className="rightButton">Buy</div>
            </div>
            <div className="box">
              <form className="space-y">
                <input placeholder="Type Keyword" />
                <select>
                  <option value="0">Propery Type</option>
                  <option value="1">Audi</option>
                  <option value="2">BMW</option>
                </select>
                <select>
                  <option value="0">Location</option>
                  <option value="1">Audi</option>
                  <option value="2">BMW</option>
                </select>
              </form>
              <div className="button">
                <button className="leftButton">
                  Filters
                  <img src="/icon.png" />
                </button>
                <button className="rightButton">
                  Search Now
                  <Search />
                </button>
              </div>
            </div>
            <div className="bottomSide">
              <div className="flexgap1">
                <img src="/houses.png" alt="home" />
                <span>Home</span>
              </div>
              <div className="flexgap1">
                <img src="/villa.png" alt="villa" />

                <span>Villa</span>
              </div>
              <div className="flexgap1">
                <img src="/office.png" alt="office" />

                <span>Office</span>
              </div>
              <div className="flexgap1">
                <img src="/apart.png" alt="office" />

                <span>Apartments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewHero;
