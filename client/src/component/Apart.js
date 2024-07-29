import React from "react";
import Container from "./Container";
import { FcDonate } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";
import { FcMultipleSmartphones } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

function Apart() {
  const navigate = useNavigate();

  const handleViewAllList = () => {
    navigate("/Property");
  };
  return (
    <div className="py-2 mb-20 -mt-4 rounded-md h-max padingm ">
      <Container className={"px-5"}>
        <div className="bg-[#F0F9FF] md:h-80 border p-5 px-10 rounded-lg md:relative  ">
          <div className="flex justify-between gap-5">
            <div className="items-center gap-2 mb-2 heading md:flex ">
              <FcDonate size={52} />
              <div className="">
                <h2 className="text-smc">What sets us apart?</h2>
                <p className="text-smc">Go from browing to buying</p>
              </div>
            </div>
            <button
              onClick={handleViewAllList}
              className="px-3 py-2 text-yellow-500 border border-yellow-500 rounded-lg shadow-inner md:px-7 h-max text-smc"
            >
              View all List
            </button>
          </div>
          <div className="items-center md:absolute md:flex md:justify-between md:gap-7 md:-bottom-20 bottom-72 right-5 left-5 ">
            <div className="p-5 py-8 mb-2 space-y-3 bg-white rounded-lg shadow-lg md:w-1/3 aspect-square md:aspect-auto">
              <div className="rounded-full bg-[#F0F9FF]  p-4 h-[80px] w-[80px]  mx-auto flex items-center justify-center">
                {/* icon */}
                <FcHome size={72} />
              </div>
              <h3 className="">WIDE RANGE OF PROPERTIES</h3>
              <p>
                Our customers have a wide range of options to choose from and
                they are all verified by our team.
              </p>
            </div>
            <div className="p-5 mb-2 space-y-3 bg-white rounded-lg shadow-lg md:w-1/3">
              <div className="rounded-full bg-[#F0F9FF] p-4 h-[80px] w-[80px] mx-auto flex items-center ">
                {/* icon */}
                <FcIdea size={72} />
              </div>
              <h3>SEAMLESS EXPERIENCE</h3>
              <p>
                We ensure a smooth process, from property selection to
                confirmation and move-in, providing our clients with the best
                possible service.
              </p>
            </div>
            <div className="p-5 mb-2 space-y-3 bg-white rounded-lg shadow-lg md:w-1/3">
              <div className="rounded-full bg-[#F0F9FF] p-4 h-[80px] w-[80px]  flex items-center mx-auto">
                {/* icon */}
                <FcMultipleSmartphones size={72} />
              </div>
              <h3>TRANSACTION SERVICES</h3>
              <p>
                Transaction services are offered with a holistic approach to
                ensure that business efficiency and cost savings are fulfilled
                for clients.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Apart;
