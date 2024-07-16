import React from "react";
import Container from "./Container";
import MultiCrousel from "./MultiCrousel";
import SectionCount from "./SectionCount";
import {
  FcBullish,
  FcDepartment,
  FcInspection,
  FcOnlineSupport,
} from "react-icons/fc";
function TopCities() {
  const sectionCounts = [
    {
      num: 2000,
      text: "Properties Sold",
      Icon: <FcBullish size={42} />,
    },
    {
      num: 80,
      text: "Projects Handled",
      Icon: <FcDepartment size={42} />,
    },
    {
      num: 400,
      text: "NRI Clientele Served",
      Icon: <FcOnlineSupport size={42} />,
    },
    {
      num: 150,
      text: "Satisfied Builders",
      Icon: <FcInspection size={42} />,
    },
  ];
  const Featured = [
    {
      key: 1,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "9000000",
      imgUrl: "/h1.jpg",
    },
    {
      key: 2,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "1000000",
      imgUrl: "/h2.jpg",
    },
    {
      key: 3,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "6000000",
      imgUrl: "/h3.jpg",
    },
  ];
  return (
    <div>
      <Container className={"md:flex justify-between md:py-20 gap-5 padingm "}>
        <div className="left space-y-5 mt-4">
          <h2>Properties In Top Cities</h2>
          <p>
            Find the home of your dreams at the finest cities of India with the
            budget you prefer. Explore apartments, villas, plots and farmlands
            across the nation.
          </p>
          <SectionCount numbers={sectionCounts} />
        </div>
        <div className="shadow-md   md:w-[60%] mt-3 md:mt-0">
          <MultiCrousel data={Featured} autoplay={true} />
        </div>
      </Container>
    </div>
  );
}

export default TopCities;
