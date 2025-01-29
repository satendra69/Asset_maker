import Container from "../component/Container";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};
const data = [
  {
    img: "/220px-Brigade_Group_Official_Logo-150x150.jpeg",
  },
  {
    img: "/sattvaLogo.jpg",
  },
  {
    img: "/dlf-g1-150x150.jpg",
  },
  {
    img: "/Embassy_Group_Logo-150x150.png",
  },
  {
    img: "/Godrej-Logo-Design-150x150.jpg",
  },
  {
    img: "/hirajan152021lkjghty_pAPYvXO-150x150.jpg",
  },
  {
    img: "/prestige-logo-C58DC32DC3-seeklogo.com_-150x150.png",
  },
  {
    img: "/sobha-developers-logo-A13E8BA5BA-seeklogo.com_-150x150.png",
  },
];

function Patners() {
  return (
    <section className="-mt-5 bg-white clients padingm ">
      <Container className={" md:py-20 space-y-5"}>
        <h2>Featured Builders In India</h2>
        <p>The most reputed builders in India</p>
        <hr className="bg-[#FECE51] w-32 h-1" />
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-50-px"
          className="z-10 py-10"
        >
          {data.map((item) => (
            <div
              className="p-4 ml-5 space-y-5 bg-white rounded-md shadow-inner card"
              key={item.id}
            >
              <img src={item.img} alt="partners" />
              <p>{item.message}</p>
            </div>
          ))}
        </Carousel>
      </Container>
      {/* required */}
      {/* <section className="bg-black footerPatner ">
        <Container className={"py-20 flex items-center justify-between"}>
          <div className="w-1/2 space-y-5 left">
            <h2 className="text-4xl font-bold text-white whitespace-nowrap">
              More than 10 Years of Experience
            </h2>
            <hr className="w-20 h-1 bg-blue-600" />
            <p>
              It’s not what we do, but how we do it that sets us apart. Get in
              touch with us today to experience our holistic services that will
              put you a step closer to your dream home.
            </p>
          </div>
          <div className="grid grid-cols-1 right md:grid-cols-2 gap-7">
            <div className="flex items-center gap-5 1">
              <FaSellsy className="text-white" size={42} />
              <div>
                <h2 className="price">2000 +</h2>
                <p className="description">Properties Sold</p>
              </div>
            </div>
            <div className="flex items-center gap-5 2">
              <MdAddHome className="text-white" size={42} />
              <div>
                <h2 className="price">80 +</h2>
                <p className="description">Projects Handled</p>
              </div>
            </div>
            <div className="flex items-center gap-5 3">
              <IoMdHappy className="text-white" size={42} />
              <div>
                <h2 className="price">400 +</h2>
                <p className="description">NRI Clientele Served</p>
              </div>
            </div>
            <div className="flex items-center gap-5 3">
              <FaRegHandshake className="text-white" size={42} />
              <div>
                <h2 className="price">150 +</h2>
                <p className="description">Marketing Projects</p>
              </div>
            </div>
          </div>
        </Container>
      </section> */}
    </section>
  );
}

export default Patners;
