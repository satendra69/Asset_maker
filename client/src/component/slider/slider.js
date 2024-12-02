import { useEffect, useRef, useState } from "react";
import httpCommon from "../../http-common";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useSwipeable } from "react-swipeable";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [translatePos, setTranslatePos] = useState({ x: 0, y: 0 });

  const sliderRef = useRef(null);
  const imageRef = useRef(null);

  const mainImage = images ? images.filter(item => item.type === "Main") : [];
  const sliderData = images ? images.filter(item => item.type === "Gallery") : [];

  let combinedImages = mainImage.concat(sliderData);

  const changeSlide = (direction) => {
    const totalImages = combinedImages.length;
    if (direction === "left") {
      setImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    } else {
      setImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
    setZoomLevel(1);
    setTranslatePos({ x: 0, y: 0 });
  };

  const handleOutsideClick = (event) => {
    if (sliderRef.current && !sliderRef.current.contains(event.target)) {
      setImageIndex(null);
    }
  };

  const handleZoom = (direction) => {
    setZoomLevel(prevZoom => {
      if (direction === "in") {
        return Math.min(prevZoom + 0.25, 3);
      } else {
        if (prevZoom <= 1.25) {
          setTranslatePos({ x: 0, y: 0 });
          return 1;
        }
        return Math.max(prevZoom - 0.25, 1);
      }
    });
  };

  const handleMouseDown = (event) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging && zoomLevel > 1 && imageRef.current) {
      const dx = event.clientX - startPos.x;
      const dy = event.clientY - startPos.y;
      setTranslatePos(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
      setStartPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScrollZoom = (event) => {
    if (event.deltaY < 0) {
      handleZoom("in");
    } else {
      handleZoom("out");
    }
  };

  const handleKeyDown = (event) => {
    if (imageIndex === null) return;

    switch (event.key) {
      case "ArrowLeft":
        changeSlide("left");
        break;
      case "ArrowRight":
        changeSlide("right");
        break;
      case "+":
      case "=":
        handleZoom("in");
        break;
      case "-":
        handleZoom("out");
        break;
      case "Escape":
        setImageIndex(null);
        break;
      default:
        break;
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => changeSlide("right"),
    onSwipedRight: () => changeSlide("left"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageIndex]);

  useEffect(() => {
    if (imageIndex !== null) {
      document.addEventListener("wheel", handleScrollZoom);
    } else {
      document.removeEventListener("wheel", handleScrollZoom);
    }
    return () => {
      document.removeEventListener("wheel", handleScrollZoom);
    };
  }, [imageIndex]);

  useEffect(() => {
    sliderRef.current?.focus();
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full gap-4 h-full max-h-[51vh] overflow-hidden">
      {imageIndex !== null && (
        <div
          ref={sliderRef}
          {...swipeHandlers}
          className="fixed inset-0 z-50 flex items-center justify-between bg-black bg-opacity-90"
        >
          <button
            aria-label="Previous Slide"
            className="absolute z-50 p-3 text-white transition-transform transform -translate-y-1/2 bg-slate-500 hover:scale-110 focus:outline-none left-4 top-1/2 md:left-6 md:top-1/2"
            onClick={() => changeSlide("left")}
          >
            <ArrowBackIosNewIcon className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div
            className="relative flex items-center justify-center flex-1 h-full overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={httpCommon.defaults.baseURL + combinedImages[imageIndex].attachment}
              alt=""
              style={{
                transform: `scale(${zoomLevel}) translate(${translatePos.x}px, ${translatePos.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.3s ease'
              }}
              className="object-contain w-full max-h-[80vh] rounded-lg shadow-lg"
            />
          </div>

          <button
            aria-label="Next Slide"
            className="absolute p-3 text-white transition-transform transform -translate-y-1/2 bg-slate-500 hover:scale-110 focus:outline-none right-4 top-1/2 md:right-6 md:top-1/2"
            onClick={() => changeSlide("right")}
          >
            <ArrowForwardIosIcon className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div className="absolute flex space-x-4 transform -translate-x-1/2 bottom-10 left-1/2">
            <button
              className="p-3 text-white transition-transform transform bg-gray-700 rounded-full hover:scale-110 focus:outline-none"
              onClick={() => handleZoom("out")}
            >
              <ZoomOutIcon className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <button
              className="p-3 text-white transition-transform transform bg-gray-700 rounded-full hover:scale-110 focus:outline-none"
              onClick={() => handleZoom("in")}
            >
              <ZoomInIcon className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <button
              className="p-3 text-white transition-transform transform bg-red-500 rounded-full hover:scale-110 focus:outline-none"
              onClick={() => setImageIndex(null)}
            >
              <CloseIcon className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1">
        <img
          src={
            mainImage && mainImage.length > 0 && mainImage[0].attachment
              ? httpCommon.defaults.baseURL + mainImage[0].attachment
              : httpCommon.defaults.baseURL + "\\images\\defaultasset.jpg"
          }
          alt="Main"
          onClick={() => mainImage && mainImage.length > 0 && setImageIndex(0)}
          className="object-contain w-full h-full transition-transform transform rounded-lg shadow-lg cursor-pointer hover:scale-105"
        />
      </div>

      <div className="flex flex-col overflow-hidden md:flex-row md:max-h-full">
        <div className="grid flex-1 max-h-full grid-cols-3 gap-5 overflow-y-auto md:grid-cols-2">
          {sliderData && sliderData.length > 0 && sliderData[0].attachment && (
            <>
              {sliderData.map((image, index) => (
                <img
                  src={httpCommon.defaults.baseURL + image.attachment}
                  alt=""
                  key={index}
                  onClick={() => setImageIndex(index + 1)}
                  className="object-cover w-full h-24 transition-transform transform rounded-lg shadow-sm cursor-pointer hover:scale-105"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slider;
