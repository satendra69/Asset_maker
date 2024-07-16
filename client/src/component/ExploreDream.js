import React from "react";

function ExploreDream() {
  return (
    <div className="bg-white flex flex-col md:flex-row w-full overflow-hidden">
      <img src="/exploreleft.jpg" alt="exolreleft" className="w-full md:w-1/2" />
      <div className="bg-[#EFB0B0] py-12 p-4 flex flex-col justify-center md:w-1/2">
        <h2 className="font-bold text-4xl leading-10 mb-6">
          Explore Your Dream Home or
          <br /> Boost Your Investment Portfolio
          <br /> Today - Your Future Awaits!
        </h2>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
          tristique metus
        </p>
        <div className="flex flex-wrap gap-5 mt-10 md:flex-nowrap">
          <div className="card bg-white h-max shadow-md pb-5 w-full md:w-60 rounded-lg">
            <div className="h-1/2 w-full">
              <img src="/pp2.jpg" alt="pp2" className="h-full object-cover rounded-t-lg" />
            </div>
            <div className="p-3">
              <h4>Darlene Robertson</h4>
              <p>Realtor</p>
              <h3>Contact seller</h3>
            </div>
          </div>
          <div className="card bg-white h-max shadow-md pb-5 w-full md:w-60 rounded-lg mt-5 md:mt-0">
            <div className="h-1/2 w-full">
              <img src="/pp2.png" alt="pp2" className="h-full object-cover rounded-t-lg" />
            </div>
            <div className="p-3">
              <h4>Darlene Robertson</h4>
              <p>Realtor</p>
              <h3>Contact seller</h3>
            </div>
          </div>
          <div className="card bg-white h-max shadow-md pb-5 w-full md:w-60 rounded-lg mt-5 md:mt-0">
            <div className="h-1/2 w-full">
              <img src="/pp2.png" alt="pp2" className="h-full object-cover rounded-t-lg" />
            </div>
            <div className="p-3">
              <h4>Darlene Robertson</h4>
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
