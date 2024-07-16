import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropertyCard from "./PropertyCard";
import TopPropertyCard from "./TopPropertyCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
    <Carousel
      swipeable={true}
      draggable={true}
      ssr={true}
      infinite={true}
      autoPlay={autoplay ? false : true} // Or set to `false` for manual control
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out" // Adjust timing and easing as needed
      transitionDuration={300} // Optional: Matches customTransition timing
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      responsive={responsive}
      className="z-10"
    >
      {data.map(
        (item) =>
          details ? (
            <PropertyCard key={item.id} card={item} />
          ) : (
            <TopPropertyCard key={item.id} card={item} />
          ) // Ensure unique keys for slides
      )}
    </Carousel>
  );
}

export default MultiCrousel;
