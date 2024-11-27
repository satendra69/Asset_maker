import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineOtherHouses } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
function Footer() {
  return (
    <div className="bg-[#1C1C1E] shadow-md text-[#F5E994]  py-10  w-full padingm  ">
      <Container className={""}>
        <div className="flex flex-col gap-5 md:flex-row md:gap-5">
          <div className="bg-[#EFB0B0] flex flex-col items-center p-5 rounded-md gap-3 py-8 relative md:flex-row md:w-1/2 mb-10 md:mb-0">
            <img
              alt="profile"
              src="/p1.jpg"
              className="rounded-md md:w-1/3 md:mr-5"
            />
            <div className="space-y-2">
              <h2 className="font-bold">You need a house</h2>
              <p>
                Tell us your needs, we will give you thousands of suggestions
                for the dream home.
              </p>
              <div className="absolute p-3 text-white bg-red-600 rounded-lg left-1/3 -bottom-7">
                <Link to="/contact-us" className="flex items-center gap-2">
                  <IoCallOutline className="font-bold" size={22} />
                  <span className="font-bold">Contact</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-[#EFB0B0] flex flex-col items-center p-5 py-8 rounded-md gap-3 relative md:flex-row md:w-1/2">
            <img
              alt="profile"
              src="/p2.jpg"
              className="rounded-md md:w-1/3 md:mr-5"
            />
            <div className="space-y-2">
              <h2 className="font-bold">Sell your house</h2>
              <p>
                We will connect you to thousands of people who need to buy a
                home.
              </p>
              <div className="absolute p-3 text-white bg-red-600 rounded-lg left-1/3 -bottom-7">
                <div className="flex items-center gap-2">
                  <MdOutlineOtherHouses className="font-bold" size={22} />|
                  <span className="font-bold">Sell Property</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-10 text-[#FFFFFF]">
        <hr className="mt-10" />
        {/* down */}
        <Container className={"py-8 flex flex-col md:flex-row gap-5"}>
          {/* div1 */}
          <div className="space-y-5 md:w-1/4">
            <h2 className="text-base font-bold text-white">Office Address</h2>
            <div>
              <p>Head office:</p>
              <p className="text-sm font-bold text-white">
                #02, Level 5, Dhruti Arcade,<br />
                Insight Academy Lane,<br />
                Marathalli, Bengaluru 560103<br />
                India.
              </p>
            </div>
            <hr />
          </div>
          {/* div2 */}
          <div className="space-y-5 md:w-1/4">
            <h2 className="text-base font-bold text-white">Contact</h2>
            <div className="flex items-center gap-2">
              <img
                src="/india.png"
                alt="flg"
                className="rounded-full h-[40px] w-[40px]"
              />
              <div className="text-sm font-bold text-white">
                <p className="text-sm">Marathalli, Bengaluru, India</p>
                <p className="text-sm text-white">(+91) 9243024730
                </p>
              </div>
            </div>
            <hr />
            <div className="flex items-center gap-2">
              <MdAddIcCall size={32} className="text-white" />
              <div className="text-sm font-bold text-white">
                <p className="text-sm">Hotline:</p>
                <p className="text-sm text-white">(+91) 7022856908</p>
              </div>
            </div>
            <hr />
            <div className="flex items-center gap-2">
              <MdOutlineEmail size={32} className="text-white" />
              <div className="text-sm font-bold text-white">
                <p className="text-sm">Email:</p>
                <a
                  className="text-sm text-white"
                  target="_blank"
                  href="mailto:info@assetmakers.com"
                >
                  info@assetmakers.com
                </a>
              </div>
            </div>
          </div>
          {/* div3 */}
          <div className="space-y-5 md:w-1/4">
            <h2 className="text-base font-bold text-white">Our Company</h2>
            <div className="flex flex-col gap-2 md:flex-row">
              <FaChevronRight className="text-red-600" />
              <p>Property For Sale</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <FaChevronRight className="text-red-600" />
              <Link to="/about-us">
                <p>About Us</p>
              </Link>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <FaChevronRight className="text-red-600" />
              <p>Terms Of Use</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <FaChevronRight className="text-red-600" />
              <p>Privacy Policy</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <FaChevronRight className="text-red-600" />
              <Link to="/contact-us">
                <p>Contact Us</p>
              </Link>
            </div>
          </div>
          {/* div4*/}
          <div className="space-y-5 md:w-1/4">
            <h2 className="text-base font-bold text-white">Newsletter</h2>
            <p className="text-sm text-white">
              Sign up to receive the latest articles
            </p>
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 text-black bg-white border rounded-lg placeholder:text-black/50 md:w-auto md:max-w-sm"
                placeholder="your email address"
              />
              <button className="flex items-center justify-center p-2 border rounded-md shadow-md md:w-full">
                Sign Up
                <span className="ml-2">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </Container>
        <p className="flex justify-center mb-10 text-white md:mb-0 md:mt-2">
          &copy; 2024 Asset Makers. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
