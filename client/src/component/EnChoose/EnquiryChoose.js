import React from "react";
import { FaUserShield } from "react-icons/fa";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Container from "../Container";

const EnquiryChoose = () => {
  return (
      <Container>
      <section className="mb-10 -mt-10 md:mt-10">
        <div className="flex flex-wrap">
          {/* Enquiry Form Section */}
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-6/12 lg:px-6">
            <div className="border border-spacing-2 bg-white shadow-2xl p-6 rounded-md">
              <h2 className="text-4xl font-bold mb-4 text-center">
                Real Estate Inquiry Form
              </h2>
              <form className="w-full">
                {/* Inquiry Type */}
                <div className="flex flex-wrap mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="inquiryType"
                    >
                      Inquiry Type
                    </label>
                    <div className="relative">
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        className="block appearance-none w-full border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 bg-gray-200"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        <option>Select</option>
                        <option>Property Seeker</option>
                        <option>Property Seller</option>
                        <option>Acquaintance</option>
                        <option>Careers</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Personal Info */}
                <div className="flex flex-wrap mb-6">
                  <div className="w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <div className="relative flex items-center">
                      <select
                        id="namePrefix"
                        name="namePrefix"
                        className="block appearance-none bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 mr-2"
                      >
                        <option>Select</option>
                        <option>Mr</option>
                        <option>Mrs</option>
                      </select>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="appearance-none block w-full bg-white border border-gray-400 text-gray-700 ml-3 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="appearance-none block w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      placeholder="Your Mail"
                    />
                  </div>
                </div>
                {/* Additional Info */}
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="maxPrice"
                    >
                      Max Price
                    </label>
                    <input
                      id="maxPrice"
                      name="maxPrice"
                      type="text"
                      className="appearance-none block w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      placeholder="Max Price"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="minSize"
                    >
                      Minimum Size (Sq Ft)
                    </label>
                    <input
                      id="minSize"
                      name="minSize"
                      type="text"
                      className="appearance-none block w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      placeholder="Minimum Size"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded-md w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12">
            <div className="flex flex-wrap">
              <div>
                <div className="flex items-center justify-center">
                  <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                    <FaUserShield size={36} />
                  </div>
                  <div className="justify-center">
                    <h2 className="text-smc">Why Choose Us</h2>
                    <p className="text-smc">
                      Choices of wide range of properties
                    </p>
                  </div>
                </div>

                <div className="mt-10 mb-5 w-full shrink-0 grow-0 basis-auto md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <PsychologyIcon size={400} />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <h3 className="text-xl font-semibold">Team of Experts</h3>
                      <p>
                        Our proactive team will help you in selecting the
                        property that best fits you. It doesn't end there, we
                        help you throughout the entire process.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5 w-full shrink-0 grow-0 basis-auto md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <AccountBalanceWalletIcon size={400} />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <h3 className="text-xl font-semibold">
                        Financing Made Easy
                      </h3>
                      <p>
                        Good properties come with a price. But worry not, we
                        offer them at the best rates possible and also offer
                        finance options to get you your dream property.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5 w-full shrink-0 grow-0 basis-auto md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <HandshakeIcon size={400} />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <h3 className="text-xl font-semibold">
                        Trusted by Thousands
                      </h3>
                      <p>
                        1108 clients have been served so far and we are keen on
                        serving thousands more. Putting a smile on our client's
                        face is our priority.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Container>
  );
};

export default EnquiryChoose;
