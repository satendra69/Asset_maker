import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import httpCommon from "../http-common";
import Container from "../component/Container";
import Social from "../component/Social";
import { FaStar } from "react-icons/fa"; // Import star icon for ratings

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CustomRightArrow = ({ onClick }) => (
  <button
    className="custom-arrow custom-right-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      zIndex: 1,
      right: 0,
      background: "transparent",
      border: "none",
      cursor: "pointer",
    }}
  >
    <ArrowForwardIos fontSize="large" style={{ color: "#007BFF" }} />
  </button>
);

const CustomLeftArrow = ({ onClick }) => (
  <button
    className="custom-arrow custom-left-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      zIndex: 1,
      left: 0,
      background: "transparent",
      border: "none",
      cursor: "pointer",
    }}
  >
    <ArrowBackIos fontSize="large" style={{ color: "#007BFF" }} />
  </button>
);

function Clients() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await httpCommon.get("/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials", error);
    }
  };

  return (
    <section className="clients bg-[#F0F9FF]">
      <Container className="py-20 space-y-10">
        <h2 className="text-4xl font-bold text-center">Our Clients Say</h2>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true}
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
          {testimonials.map((item) => (
            <div className="p-5 ml-5 space-y-5 bg-white rounded-lg shadow-md card" key={item.id}>
              <div className="flex items-center gap-3">
                <div className="rounded-full border-2 border-blue-600 p-1 overflow-hidden md:w-[64px] md:h-[64px] w-[40px] h-[40px]">
                  <img
                    alt="profile"
                    className="object-cover w-full h-full border border-black rounded-full"
                    src={
                      item.photo
                        ? `data:image/jpeg;base64,${item.photo}`
                        : "/default-profile.png"
                    }
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">{item.designation}</p>
                  <div className="flex items-center">
                    {[...Array(item.rating)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="px-1 text-gray-700">{item.message}</p>
            </div>
          ))}
        </Carousel>
      </Container>
      <Social />
    </section>
  );
}

export default Clients;
