import Container from "../component/Container";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import c1 from "../public/220px-Brigade_Group_Official_Logo-150x150.jpeg";
import c2 from "../public/925597855s-150x150.png";
import c3 from "../public/dlf-g1-150x150.jpg";
import c4 from "../public/Embassy_Group_Logo-150x150.png";
import c5 from "../public/Godrej-Logo-Design-150x150.jpg";
import c6 from "../public/hirajan152021lkjghty_pAPYvXO-150x150.jpg";
import c7 from "../public/prestige-logo-C58DC32DC3-seeklogo.com_-150x150.png";
import c8 from "../public/sobha-developers-logo-A13E8BA5BA-seeklogo.com_-150x150.png";
import { FaSellsy } from "react-icons/fa6";
import { MdAddHome } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
    img: c1,
  },
  {
    img: c2,
  },
  {
    img: c3,
  },
  {
    img: c4,
  },
  {
    img: c5,
  },
  {
    img: c6,
  },
  {
    img: c7,
  },
  {
    img: c8,
  },
];

function Patners() {
  return (
    <section className="clients bg-white -mt-5 padingm ">
      <Container className={" md:py-20 space-y-5"}>
        <h2>Featured Builders In India</h2>
        <p>The most reputed builders in India</p>
        <hr className="bg-[#FECE51] w-32 h-1" />
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
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
          className="py-10 z-10"
        >
          {data.map((item) => (
            <div
              className="card space-y-5 ml-5 p-4 shadow-inner  bg-white rounded-md"
              key={item.id}
            >
              <img src={item.img} />
              <p>{item.message}</p>
            </div>
          ))}
        </Carousel>
      </Container>
      {/* required */}
      {/* <section className="footerPatner  bg-black ">
        <Container className={"py-20 flex items-center justify-between"}>
          <div className="left space-y-5 w-1/2">
            <h2 className="text-white font-bold text-4xl whitespace-nowrap">
              More than 10 Years of Experience
            </h2>
            <hr className="w-20 h-1 bg-blue-600" />
            <p>
              It’s not what we do, but how we do it that sets us apart. Get in
              touch with us today to experience our holistic services that will
              put you a step closer to your dream home.
            </p>
          </div>
          <div className="right grid md:grid-cols-2 grid-cols-1 gap-7">
            <div className="1 flex items-center gap-5">
              <FaSellsy className="text-white" size={42} />
              <div>
                <h2 className="price">2000 +</h2>
                <p className="description">Properties Sold</p>
              </div>
            </div>
            <div className="2 flex items-center gap-5">
              <MdAddHome className="text-white" size={42} />
              <div>
                <h2 className="price">80 +</h2>
                <p className="description">Projects Handled</p>
              </div>
            </div>
            <div className="3 flex items-center gap-5">
              <IoMdHappy className="text-white" size={42} />
              <div>
                <h2 className="price">400 +</h2>
                <p className="description">NRI Clientele Served</p>
              </div>
            </div>
            <div className="3 flex items-center gap-5">
              <FaRegHandshake className="text-white" size={42} />
              <div>
                <h2 className="price">150 +</h2>
                <p className="description">Satisfied Builders</p>
              </div>
            </div>
          </div>
        </Container>
      </section> */}
    </section>
  );
}

export default Patners;
