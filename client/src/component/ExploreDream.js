import React from "react";

function ExploreDream() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white md:flex-row">
      <img src="/exploreleft.jpg" alt="exolreleft" className="w-full md:w-1/2" />
      <div className="bg-[#EFB0B0] py-12 p-4 flex flex-col justify-center md:w-1/2">
        <h2 className="mb-6 text-4xl font-bold leading-10">
          Explore Your Dream Home or
          <br /> Boost Your Investment Portfolio
          <br /> Today - Your Future Awaits!
        </h2>
        <p className="text-sm">
          Discover properties tailored to your lifestyle and goals. Whether you're searching for a cozy family retreat or a lucrative investment, we're here to guide you every step of the way.
        </p>
        <div className="flex flex-wrap gap-5 mt-10 md:flex-nowrap">
          <div className="w-full pb-5 bg-white rounded-lg shadow-md card h-max md:w-60">
            <div className="w-full h-1/2">
              <img src="/pp1.jpg" alt="pp2" className="object-cover h-full rounded-t-lg" />
            </div>
            <div className="p-3">
              <h4>Darlene Robertson</h4>
              <p>Realtor</p>
              <h3>Contact seller</h3>
            </div>
          </div>
          <div className="w-full pb-5 mt-5 bg-white rounded-lg shadow-md card h-max md:w-60 md:mt-0">
            <div className="w-full h-1/2">
              <img src="/pp2.png" alt="pp2" className="object-cover h-full rounded-t-lg" />
            </div>
            <div className="p-3">
              <h4>Ethan Parker</h4>
              <p>Realtor</p>
              <h3>Contact seller</h3>
            </div>
          </div>
          <div className="w-full pb-5 mt-5 bg-white rounded-lg shadow-md card h-max md:w-60 md:mt-0">
            <div className="w-full h-1/2">
              <img src="/pp3.jpg" alt="pp2" className="object-cover h-full rounded-t-lg" />
            </div>
            <div className="p-3">
              <h4>Liam Hayes</h4>
              <p>Realtor</p>
              <h3>Contact seller</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-5">
          <hr className="h-1.5 w-10 bg-red-600/50 rounded-xl mr-2" />
          <hr className="h-1.5 w-10 bg-red-600 rounded-xl mr-2" />
          <hr className="h-1.5 w-10 bg-red-600/50 rounded-xl" />
        </div>
      </div>
    </div>

  );
}

export default ExploreDream;
