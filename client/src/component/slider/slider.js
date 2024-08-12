import { useEffect, useRef, useState } from "react";
import httpCommon from "../../http-common";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);
  const sliderRef = useRef(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
    } else {
      setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
    }
  };

  const handleOutsideClick = (event) => {
    if (sliderRef.current && !sliderRef.current.contains(event.target)) {
      setImageIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full gap-5 h-96 max-h-[80vh] overflow-hidden">
      {imageIndex !== null && (
        <div
          ref={sliderRef}
          className="fixed inset-0 z-50 flex items-center justify-between p-4 bg-black bg-opacity-80"
        >
          <button
            className="p-2 text-white transition-transform transform hover:scale-110"
            onClick={() => changeSlide("left")}
          >
            <ArrowBackIosNewIcon className="w-10 h-10 md:h-8 md:w-8" />
          </button>
          <div className="flex items-center justify-center flex-1">
            <img
              src={httpCommon.defaults.baseURL + images[imageIndex].attachment}
              alt=""
              className="object-contain rounded-lg shadow-lg max-w-[90%] max-h-[90%] w-auto h-auto"
            />
          </div>
          <button
            className="p-2 text-white transition-transform transform hover:scale-110"
            onClick={() => changeSlide("right")}
          >
            <ArrowForwardIosIcon className="w-10 h-10 md:h-8 md:w-8" />
          </button>
          <button
            className="absolute text-3xl text-white transition-colors top-20 right-4 hover:text-red-500"
            onClick={() => setImageIndex(null)}
          >
            <CloseIcon className="w-8 h-8 md:h-6 md:w-6" />
          </button>
        </div>
      )}
      <div className="flex-1">
        {images && images.length > 0 && images[0].attachment && (
          <img
            src={httpCommon.defaults.baseURL + images[0].attachment}
            alt=""
            onClick={() => setImageIndex(0)}
            className="object-contain w-full h-full transition-transform transform rounded-lg shadow-lg cursor-pointer hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col overflow-hidden md:flex-row md:max-h-full">
        <div className="grid flex-1 max-h-full grid-cols-3 gap-5 overflow-y-auto md:grid-cols-2">
          {images.slice(1).map((image, index) => (
            <img
              src={httpCommon.defaults.baseURL + image.attachment}
              alt=""
              key={index}
              onClick={() => setImageIndex(index + 1)}
              className="object-cover w-full h-24 transition-transform transform rounded-lg shadow-sm cursor-pointer hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
