import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCaretDown, AiFillPropertySafety } from "react-icons/ai";
import { FaBuilding, FaHamburger, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "./Container";
import { IoMdLogOut } from "react-icons/io";
import { CiLogin, CiSaveDown2 } from "react-icons/ci";
import { IoBuild, IoCreateOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { signOutUserSuccess } from "../redux/userSlice";
import { MdApartment, MdGrass, MdHouseSiding, MdVilla } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiVikingLonghouse } from "react-icons/gi";
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};
const variants2 = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};
const glowVariants = {
  glow: {
    boxShadow: `0 0 0 10px rgba(255, 255, 255, 0.3)`, // Inner white glow
    transition: {
      duration: 1, // Animation duration in seconds
      ease: "easeInOut", // Animation timing function
      repeat: Infinity, // Repeat the animation infinitely
      repeatType: "reverse", // Reverse the animation for smooth looping
    },
  },
};

const pendulumVariants = {
  rest: {
    rotate: 0,
  },
  swing: {
    rotate: [-10, 10], // Swing between -10 and 10 degrees
    transition: {
      duration: 2, // Animation duration in seconds
      ease: "easeInOut", // Animation timing function
      repeat: Infinity, // Repeat the animation infinitely
    },
  },
};

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [citieOpen, setOpenCities] = useState(false);
  const [propOpen, setOpenProp] = useState(false);
  const [cityOpenMobile, setOpenCityMobile] = useState(false);
  const [propOpenMobile, setOpenPropMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState(false);

  const cityDropdownRef = useRef(null);
  const propDropdownRef = useRef(null);
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleCityClick = (cityName) => {
    setOpenCities(false);
    setOpenProp(false);
    navigate(`/Cities/${cityName}`);
  };

  const handleCategoryClick = (PropertyName) => {
    setOpenCities(false);
    setOpenProp(false);
    navigate(`/Property/${PropertyName}`);
  };

  const handleOutsideClick = (event) => {
    if (
      cityDropdownRef.current &&
      !cityDropdownRef.current.contains(event.target) &&
      propDropdownRef.current &&
      !propDropdownRef.current.contains(event.target)
    ) {
      setOpenCities(false);
      setOpenProp(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleCityDropdown = () => {
    setOpenCityMobile(!cityOpenMobile);
  };

  const togglePropDropdown = () => {
    setOpenPropMobile(!propOpenMobile);
  };

  // Logout
  const handleLogout = () => {
    dispatch(signOutUserSuccess());
    navigate("/");
    toast.success("Logot Successful");
  };

  return (
    <>
      <Toaster richColors />
      <header
        className={`${active
          ? "bg-[#F7F7F8] text-slate-900 font-medium "
          : "bg-slate-900 text-[#F5E994]"
          } fixed top-0 left-0 right-0  transition-all  duration-1000 ease-in-out px-4 md:px-0 `}
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto p-3 md:px-6">

          {/* LOGO */}
          <Link to="/">
            <img
              src={
                active
                  ? "/logo2.jpg"
                  : "https://assetmakers.com/wp-content/uploads/2019/07/Asset-Makers-Logo-Brightest.png"
              }
              className="h-12 object-contain"
            />
          </Link>


          <ul className="flex items-center gap-4">

            {/* Home */}
            <Link to={"/"} className="hidden sm:inline">
              HOME
            </Link>

            {/* CITIES */}
            <button
              className="relative md:block hidden"
              onMouseEnter={() => setOpenCities(true)}
              onMouseLeave={() => setOpenCities(false)}
            >
              <li className="hidden items-center md:flex gap-2">
                <span> CITIES</span> <AiFillCaretDown />
              </li>
              <div
                className={`${citieOpen ? "block" : "hidden"} transition-all text-left duration-1000 absolute top-full left-0 shadow-md bg-white py-2 px-7 space-y-2 rounded-md`}
                ref={cityDropdownRef}
                onMouseEnter={() => setOpenCities(true)}
                onMouseLeave={() => setOpenCities(false)}
              >
                <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCityClick("Bangalore")}>Bangalore</p>
                <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCityClick("Hyderabad")}>Hyderabad</p>
                <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCityClick("Tirupati")}>Tirupati</p>
              </div>
            </button>


            {/* PROPERTIES */}

            <button
              className="relative md:block hidden"
              onMouseEnter={() => setOpenProp(true)}
              onMouseLeave={() => setOpenProp(false)}
            >
              <li className="hidden sm:flex items-center relative gap-2">
                <span> PROPERTIES </span> <AiFillCaretDown />
                <div
                  className={`${propOpen ? "block" : "hidden"} transition-all text-left duration-1000 absolute top-full left-0 shadow-md bg-white space-y-2 py-2 px-7 w-56 rounded-md `}
                  ref={propDropdownRef}
                  onMouseEnter={() => setOpenProp(true)}
                  onMouseLeave={() => setOpenProp(false)}
                >
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Apartments")}>Apartments</p>
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Villas")}>Villas</p>
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Plots")}>Plots</p>
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Row")}>Row Houses</p>
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Villaments")}>Villaments</p>
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Commercial")}>Commercial Properties</p>
                  <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCategoryClick("Pent")}>Pent Houses</p>
                </div>
              </li>
            </button>

            {/* ABOUT US */}
            <Link
              to={"/about-us"}
              className="hidden sm:inline"
            >
              ABOUT US
            </Link>

            {/* CONTACT US */}
            <Link
              to={"/contact-us"}
              className="hidden sm:inline"
            >
              CONTACT US
            </Link>

            {/* bigscreen end */}

            {/* mobile menu */}
            <div className="block sm:hidden">
              <FaHamburger
                size={32}
                className={`${active ? "text-slate-900" : "text-[#F7F7F8]"
                  }text-slate-900 sm:inline hover:brightness-100 relative`}
                onClick={() => setMenuOpen(!menuOpen)}
              />
              <motion.div
                animate={menuOpen ? "open" : "closed"}
                variants={variants}
                className="list bg-white p-2 py-10 text-black shadow-xl flex flex-col gap-5 absolute top-16 w-[90%] right-8 rounded-md h-[90vh]"
              >
                {/* Cities */}
                <details className="group">
                  <summary className="flex items-center justify-between px-2 font-medium marker:content-none hover:cursor-pointer"
                    onClick={toggleCityDropdown}
                  >
                    <span className="flex items-center gap-2">
                      <Link className="no-underline">CITIES</Link> <AiFillCaretDown />
                    </span>
                  </summary>
                  <article className="px-4 pb-4">
                    <ul className="flex flex-col gap-2 pl-2 mt-4">
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Cities/Bangalore"}
                          onClick={() => { setMenuOpen(false); setOpenCityMobile(false) }}
                        >
                          Bangalore
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Cities/Hyderabad"}
                          onClick={() => { setMenuOpen(false); setOpenCityMobile(false) }}
                        >
                          Hyderabad
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Cities/Tirupati"}
                          onClick={() => { setMenuOpen(false); setOpenCityMobile(false) }}
                        >
                          Tirupati
                        </Link>
                      </li>
                    </ul>
                  </article>
                </details>

                {/* Properties */}
                <details className="group">
                  <summary className="flex items-center justify-between px-2 font-medium marker:content-none hover:cursor-pointer"
                    onClick={togglePropDropdown}
                  >
                    <span className="flex items-center gap-2">
                      <Link className="no-underline">PROPERTIES</Link> <AiFillCaretDown />
                    </span>
                  </summary>
                  <article className="px-4 pb-4">
                    <ul className="flex flex-col gap-2 pl-2 mt-4">
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Apartments"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Apartments
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Villas"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Villas
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Plots"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Plots
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Row"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Row Houses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Villaments"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Villaments
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Commercial"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Commercial Properties
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:text-[#F5E994]"
                          to={"/Property/Pent"}
                          onClick={() => { setMenuOpen(false); setOpenPropMobile(false) }}
                        >
                          Pent Houses
                        </Link>
                      </li>
                    </ul>
                  </article>
                </details>

                <Link
                  className="hover:underline px-2"
                  to={"/about-us"}
                  onClick={() => setMenuOpen(false)}
                >
                  ABOUT US
                </Link>
                <Link
                  className="hover:underline px-2"
                  to={"/contact-us"}
                  onClick={() => setMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <Link
                  className="hover:underline px-2"
                  to={"/sign-in"}
                  onClick={() => setMenuOpen(false)}>
                  Login/Register
                </Link>
              </motion.div>
            </div>

          </ul>

          {/* Login */}
          {currentUser ? (
            <button
              onClick={() => setProfile(!profile)}
              className="hover:underline hidden sm:inline relative"
            >
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-red-700 text-white  rounded-lg px-3 py-2">
                  <span> Sell Property </span>
                  <motion.div animate="swing" variants={pendulumVariants}>
                    <FaHome size={26} />
                  </motion.div>
                </button>
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="profie"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </div>
              {profile && (
                <motion.div className="absolute shadow-md rounded-lg p-5 space-y-3 bg-white right-0 ">
                  {currentUser.admin == 1 && (
                    <Link
                      className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                      to={"/admin"}
                    >
                      {" "}
                      <MdOutlineAdminPanelSettings size={32} />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                    to={"/saved-list"}
                  >
                    <CiSaveDown2 size={32} /> Saved List
                  </Link>
                  <Link
                    className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                    to={"/my-list"}
                  >
                    <IoCreateOutline size={32} /> My List
                  </Link>

                  <button
                    className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    {" "}
                    <IoMdLogOut size={32} />
                    Logout{" "}
                  </button>
                </motion.div>
              )}
            </button>
          ) : (
            <div className="rigister flex items-center gap-5 ">
              <Link to={"/sign-in"} className="flex items-center gap-1">
                <CiLogin size={22} />
                Login/Register
              </Link>
              <button className="flex items-center gap-2 bg-red-700 text-white  rounded-lg px-3 py-2">
                <span> Sell Property </span>
                <motion.div animate="swing" variants={pendulumVariants}>
                  <FaHome size={26} />
                </motion.div>
              </button>
            </div>
          )}
        </div>


        {active && (
          <motion.div
            className=" shadow-md bg-[#F7F7F8] hidden md:block"
            animate={active ? "open" : "closed"}
            variants={variants2}
          >
            {/* hr */}
            <hr className=" w-full bg-slate-900" />
            <Container className={"flex items-center justify-between"}>
              <Link to={"/Property/Apartments"} className="flex items-center gap-1 text-slate-900">
                <MdApartment size={25} />
                Apartments
              </Link>
              <Link to={"/Property/Villas"} className="flex items-center gap-1 text-slate-900">
                <MdVilla size={25} />
                Villas
              </Link>
              <Link to={"/Property/Plots"} className="flex items-center gap-1 text-slate-900">
                <MdGrass size={25} /> Plots
              </Link>
              <Link to={"/Property/Row"} className="flex items-center gap-1 text-slate-900">
                <MdHouseSiding size={25} />
                Row Houses
              </Link>
              <Link to={"/Property/Villaments"} className="flex items-center gap-1 text-slate-900">
                <FaBuilding size={22} />
                Villaments
              </Link>
              <Link to={"/Property/Commercial"} className="flex items-center gap-1 ">
                <AiFillPropertySafety size={25} />
                <span className="text-slate-900">Commercial Properties</span>
              </Link>
              <Link to={"/Property/Pent"} className="flex items-center gap-1 text-slate-900">
                <GiVikingLonghouse size={25} /> Pent Houses
              </Link>
            </Container>
            {/* hr */}
            <hr className="w-full bg-slate-900" />
          </motion.div>
        )}
      </header>
    </>
  );
}

export default Header;
