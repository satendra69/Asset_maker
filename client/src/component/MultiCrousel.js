import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropertyCard from "./PropertyCard";
import TopPropertyCard from "./TopPropertyCard";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // You can use any icon library
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-20 transform -translate-y-1/2 custom-arrow custom-left-arrow top-1/2"
    >
      <IoIosArrowBack size={24} />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-20 transform -translate-y-1/2 custom-arrow custom-right-arrow top-1/2"
    >
      <IoIosArrowForward size={24} />
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

  console.log(data, "multicarousel");
  return (
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
  );
}

export default MultiCrousel;
