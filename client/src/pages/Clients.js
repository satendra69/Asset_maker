import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Container from "../component/Container";
import Social from "../component/Social";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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

const data = [
  {
    name: "Sangeeta Goyal",
    description: "IT Professional | Bengaluru",
    message:
      "We are quite happy with the way Asset Makers team deal and navigate the real estate purchase or sale transaction with purchaser and seller, to be frank i experienced both the versions of property transactions with them and i am not much aware how does all this modalities work since i indulge in my IT domain. I do not stop referring them with in my references which is out of affection. Thanks !!",
    img: "https://assetmakers.com/wp-content/uploads/2021/11/vidya-150x150.jpg",
  },
  {
    name: "Satish",
    description:
      "Co-Founder & Director Silicon Mosaic Technologies Pvt Ltd | Bengaluru",
    message:
      "We are quite happy with the way Asset Makers team deal and navigate the real estate purchase or sale transaction with purchaser and seller, to be frank i experienced both the versions of property transactions with them and i am not much aware how does all this modalities work since i indulge in my IT domain. I do not stop referring them with in my references which is out of affection. Thanks !!",
    img: "https://assetmakers.com/wp-content/uploads/2021/11/Satish-Acharya-150x150.jpg",
  },
  {
    name: "Krishna Prasad",
    description: "IT Entrepreneur, Gurgaon",
    message: "I was quite happy with the transaction and professionalism.",
    img: "https://assetmakers.com/wp-content/uploads/2019/01/Valladi-150x150.jpeg",
  },
];

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      className="custom-arrow custom-right-arrow"
      onClick={onClick}
      style={{
        position: "absolute",
        zIndex: 1,
        right: 0,
      }}
    >
      <ArrowForwardIos fontSize="large" />
    </button>
  );
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      className="custom-arrow custom-left-arrow"
      onClick={onClick}
      style={{
        position: "absolute",
        zIndex: 1,
        left: 0,
      }}
    >
      <ArrowBackIos fontSize="large" />
    </button>
  );
};

function Clients() {
  return (
    <section className="clients bg-[#F0F9FF]">
      <Container className="py-20 space-y-10">
        <h2 className="text-4xl text-center">Our Clients Say</h2>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all 300ms ease-in-out"
          transitionDuration={300}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {data.map((item, index) => (
            <div className="ml-5 space-y-5 card" key={index}>
              <div className="flex gap-3 item">
                <div className="rounded-full border-2 border-blue-600 p-1 overflow-hidden md:w-[64px] md:h-[64px] w-[40px] h-[40px]">
                  <img
                    alt="profile"
                    className="w-full h-full border border-black rounded-full"
                    src={item.img}
                  />
                </div>
                <div>
                  <h2>{item.name}</h2>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
              <p className="px-10">{item.message}</p>
            </div>
          ))}
        </Carousel>
      </Container>
      <Social />
    </section>
  );
}

export default Clients;
