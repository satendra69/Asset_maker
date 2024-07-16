import React from "react";
import Social from "../component/Social";
import { FaSellsy } from "react-icons/fa6";
import { MdAddHome } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";
import Container from "../component/Container";

function AboutUs() {
  return (
    <div>
      <div className="relative h-96 w-full md:h-[28rem]">
        <img
          src="https://images.unsplash.com/photo-1494783367193-149034c05e8f"
          alt="Leading Property Company"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-red-500 bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center leading-tight">
            We Are A Leading Property Company
          </h1>
        </div>
      </div>

      <Container>
        {/* First Section */}
        <hr className="my-2 -mt-10" />
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold text-gray-800">Our Story</h1>
              <p className="text-lg mt-4 text-gray-700 leading-relaxed">
                Asset Makers embarked on its journey in early 2008 and has been
                evolving ever since. The unwavering support of our esteemed
                clients and partners has fueled our growth.
                <br />
                <br />
                We pride ourselves on our core values that serve as guiding
                beacons towards our success.
                <br />
                <br />
                <b>Meet our Founders:</b> <b>Mr. Sunil Vora</b> and{" "}
                <b>Mr. Kanchan Singh Bedi (Aman)</b>
                <br />
                <br />
                <i>(Founders & Managing Directors)</i>
                <br />
                <br />
                Our core values form the bedrock of our operations, guiding us
                in every endeavor. We imbue these values into every project, as
                they are the driving force behind our success.
                <br />
                <br />
                For us, a property is more than just a transaction. It is about
                realizing dreams.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                className="w-full rounded-lg shadow-lg"
                src="/Paaji-Kannu.png"
                alt="Founders"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="mx-auto text-center">
            <h1 className="text-4xl  md:text-5xl font-bold text-gray-800 mb-2">
              Why Choose AssetMakers?
            </h1>
            <hr className="w-1/3 h-1 bg-[#a3a3a3] mb-2 mx-auto" />
            <p className="text-lg md:text-xl text-gray-600">
              When it comes to property, we settle for nothing but the best.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="gap-8">
            {/* Card 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-16 bg-slate-50 shadow-lg rounded-lg overflow-hidden">
              <div>
                <img
                  src="driven.png"
                  alt="Driven"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-cream p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Driven</h2>
                <p className="text-lg">
                  We believe that commitment and dedication are the cornerstones
                  of success. Persistence is key to achieving long-term goals,
                  and at Asset Makers, we never shy away from challenges. We
                  push boundaries, strive for excellence, and never settle for
                  mediocrity.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-16 bg-slate-50 shadow-lg rounded-lg overflow-hidden">
              <div className="bg-cream p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Caring</h2>
                <p className="text-lg">
                  Empathy is our driving force at Asset Makers. We are dedicated
                  to empowering our clients, ensuring their journey towards
                  success is as smooth as possible. With years of experience, we
                  share our knowledge and insights to help clients achieve their
                  dreams. Success for us is not just about transactions; it's
                  about creating meaningful connections and making dreams a
                  reality.
                </p>
              </div>
              <div>
                <img
                  src="caring.png"
                  alt="Caring"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-16 bg-slate-50 shadow-lg rounded-lg overflow-hidden">
              <div>
                <img
                  src="knowledge.png"
                  alt="Knowledgeable"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-cream p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Knowledgeable</h2>
                <p className="text-lg">
                  With over a decade of experience, we have accumulated
                  invaluable knowledge and expertise in the real estate
                  industry. Despite market fluctuations, Asset Makers has
                  consistently remained ahead of the curve. Our proactive
                  approach and industry insights enable us to navigate
                  challenges and deliver optimal results for our clients.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-16 bg-slate-50 shadow-lg rounded-lg overflow-hidden">
              <div className="bg-cream p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Brave</h2>
                <p className="text-lg">
                  Courage is at the heart of everything we do. At Asset Makers,
                  we embrace challenges and turn obstacles into opportunities.
                  We understand that pursuing dreams involves risks, but we face
                  them head-on. Our determination and resilience have propelled
                  us forward, and we empower our clients to do the same.
                </p>
              </div>
              <div>
                <img
                  src="brave.jpg"
                  alt="Brave"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Card 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-16 bg-slate-50 shadow-lg rounded-lg overflow-hidden">
              <div>
                <img
                  src="agile.png"
                  alt="Agile"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-cream p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Agile</h2>
                <p className="text-lg">
                  Success is not a destination; it's a journey filled with
                  twists and turns. At Asset Makers, we thrive in dynamic
                  environments. Our agility allows us to adapt to market changes
                  swiftly, ensuring our clients always stay ahead of the curve.
                  Whether it's market trends or client needs, we embrace change
                  and turn challenges into opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
      </Container>
      <section className="footerPatner  bg-[#1C1C1E] ">
        <Container
          className={
            "md:py-20 flex flex-col md:flex-row items-center justify-between"
          }
        >
          <div className="left md:w-1/2 w-full md:pr-10">
            <h2 className="text-white font-bold text-4xl md:text-5xl mb-4">
              More than 10 Years of Experience
            </h2>
            <hr className="w-20 h-1 bg-blue-800 mb-4" />
            <p className="text-white">
              It’s not what we do, but how we do it that sets us apart. Get in
              touch with us today to experience our holistic services that will
              put you a step closer to your dream home.
            </p>
          </div>
          <div className="right md:w-1/2 w-full grid md:grid-cols-2 grid-cols-1 gap-7 mt-10 md:mt-0">
            <div className="1 flex items-center gap-5">
              <FaSellsy className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">2,000 +</h2>
                <p className="description text-white">Properties Sold</p>
              </div>
            </div>
            <div className="2 flex items-center gap-5">
              <MdAddHome className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">80 +</h2>
                <p className="description text-white">Projects Handled</p>
              </div>
            </div>
            <div className="3 flex items-center gap-5">
              <IoMdHappy className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">400 +</h2>
                <p className="description text-white">NRI Clientele Served</p>
              </div>
            </div>
            <div className="3 flex items-center gap-5">
              <FaRegHandshake className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">150 +</h2>
                <p className="description text-white">Satisfied Builders</p>
              </div>
            </div>
          </div>
        </Container>

        <hr className="" />
      </section>

      <Social />
    </div>
  );
}

export default AboutUs;
