import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropertyCard from "./PropertyCard";
import TopPropertyCard from "./TopPropertyCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-20 p-3 ml-4 transition-all duration-300 transform -translate-y-1/2 bg-transparent border-2 border-gray-300 rounded-full top-1/2 hover:bg-gray-200 hover:border-gray-400 custom-arrow custom-left-arrow"
      style={{ marginRight: "20px" }}
    >
      <IoIosArrowBack size={24} className="text-gray-600" />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-20 p-3 mr-4 transition-all duration-300 transform -translate-y-1/2 bg-transparent border-2 border-gray-300 rounded-full top-1/2 hover:bg-gray-200 hover:border-gray-400 custom-arrow custom-right-arrow"
      style={{ marginLeft: "20px" }}
    >
      <IoIosArrowForward size={24} className="text-gray-600" />
    </button>
  );
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function MultiCrousel({ data, autoplay, details }) {
  return (
    <div className="relative">
      <Carousel
        swipeable={true}
        draggable={true}
        ssr={true}
        infinite={true}
        autoPlay={autoplay ? false : true}
        autoPlaySpeed={7000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}
        className="z-10"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {data.map(
          (item) =>
            details ? (
              <PropertyCard key={item.id} card={item} />
            ) : (
              <TopPropertyCard key={item.id} card={item} />
            )
        )}
      </Carousel>
    </div>
  );
}

export default MultiCrousel;
