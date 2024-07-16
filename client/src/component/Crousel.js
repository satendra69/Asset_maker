import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FcInfo } from "react-icons/fc";
import { motion } from "framer-motion";

function SingleCrousel({ data }) {
  return (
    <Carousel
      autoPlay={true}
      showStatus={false}
      infiniteLoop={true}
      dynamicHeight={true}
      showThumbs={false}
      className="mt-5 h-full"
    >
      {data.map((item) => (
        <div className="md:h-full relative" key={item.id}>
          <img
            src={item.imgUrl}
            className="object-contain  h-full"
            style={{ zIndex: 1 }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default SingleCrousel;
