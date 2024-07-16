import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCaretDown, AiFillPropertySafety } from "react-icons/ai";
import { FaBuilding, FaHamburger, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoMdLogOut } from "react-icons/io";
import { CiLogin, CiSaveDown2 } from "react-icons/ci";
import { IoBuild, IoCreateOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { signOutUserSuccess } from "../redux/userSlice";
import { MdApartment, MdGrass, MdHouseSiding, MdVilla } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiVikingLonghouse } from "react-icons/gi";
import Container from "./Container";

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
    boxShadow: `0 0 0 10px rgba(255, 255, 255, 0.3)`,
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const pendulumVariants = {
  rest: {
    rotate: 0,
  },
  swing: {
    rotate: [-10, 10],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
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
    toast.success("Logout Successful");
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
              alt="logo"
              className="h-12 object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-4">
            <li className="hidden sm:inline">
              <Link to={"/"}>HOME</Link>
            </li>
            <li className="relative md:block hidden"></li>

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

            {/* PROPERTIES Dropdown */}
            <li className="relative md:block hidden">
              <button
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
            </li>

            <li className="hidden sm:inline">
              <Link to={"/about-us"}>ABOUT US</Link>
            </li>
            <li className="hidden sm:inline">
              <Link to={"/contact-us"}>CONTACT US</Link>
            </li>
          </ul>

          {/* Login/Register and Sell Property for big screens */}
          {currentUser ? (
            <button
              onClick={() => setProfile(!profile)}
              className="hidden sm:inline relative"
            >
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-red-700 text-white rounded-lg px-3 py-2">
                  <span>Sell Property</span>
                  <motion.div animate="swing" variants={pendulumVariants}>
                    <FaHome size={26} />
                  </motion.div>
                </button>
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="profile"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </div>
              {profile && (
                <motion.div className="absolute shadow-md rounded-lg p-5 space-y-3 bg-white right-0 ">
                  {currentUser.admin === 1 && (
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
            <div className="hidden sm:flex justify-center items-center gap-3">
              <Link to={"/sign-in"} className="flex items-center gap-1">
                <CiLogin size={22} />
                Login/Register
              </Link>
              <button className="flex items-center gap-2 bg-red-700 text-white rounded-lg px-3 py-2">
                <span>Sell Property</span>
                <motion.div animate="swing" variants={pendulumVariants}>
                  <FaHome size={26} />
                </motion.div>
              </button>
            </div>
          )}

          {/* HAMBURGER MENU */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <FaHamburger size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={variants}
          className={`absolute top-20 right-0  w-3/5 sm:hidden  bg-[#F7F7F8]  text-slate-900 p-4 rounded-l-3xl  `}
        >
          <ul className="space-y-4">
            <li>
              <Link to={"/"} className="hover:underline" onClick={() => setMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline" onClick={() => setMenuOpen(false)}>
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to={"/contact-us"} className="hover:underline" onClick={() => setMenuOpen(false)}>
                CONTACT US
              </Link>
            </li>
            <li>
              <button
                onClick={toggleCityDropdown}
                className="flex items-center justify-between w-full hover:underline focus:outline-none"
              >
                <span>CITIES</span> <AiFillCaretDown />
              </button>
              <div
                className={`${cityOpenMobile ? "block" : "hidden"
                  } transition-all text-left duration-1000 mt-2`}
              >
                <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCityClick("Bangalore")}>Bangalore</p>
                <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCityClick("Hyderabad")}>Hyderabad</p>
                <p className="hover:font-bold hover:text-black cursor-pointer" onClick={() => handleCityClick("Tirupati")}>Tirupati</p>
              </div>
            </li>
            <li>
              <button
                onClick={togglePropDropdown}
                className="flex items-center justify-between w-full hover:underline focus:outline-none"
              >
                <span>PROPERTIES</span> <AiFillCaretDown />
              </button>
              <div
                className={`${propOpenMobile ? "block" : "hidden"
                  } transition-all text-left duration-1000 mt-2`}
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
            {currentUser ? (
              <>
                <li>
                  <button
                    onClick={() => setProfile(!profile)}
                    className="flex items-center justify-between w-full hover:underline focus:outline-none"
                  >
                    <span>Profile</span> <AiFillCaretDown />
                  </button>
                  {profile && (
                    <motion.div
                      className={`${profile ? "block" : "hidden"} transition-all text-left duration-1000 mt-2`}
                    >
                      {currentUser.admin === 1 && (
                        <Link
                          className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                          to={"/admin"}
                        >
                          <MdOutlineAdminPanelSettings size={32} />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                        to={"/saved-list"}
                      >
                        <CiSaveDown2 size={32} />
                        Saved List
                      </Link>
                      <Link
                        className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                        to={"/my-list"}
                      >
                        <IoCreateOutline size={32} />
                        My List
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-slate-900 gap-2 whitespace-nowrap"
                      >
                        <IoMdLogOut size={32} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link to={"/sign-in"} className="hover:underline" onClick={() => setMenuOpen(false)}>
                  <div className="flex items-center gap-2">
                    <span>Login/Register</span> <CiLogin size={26} />
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </motion.div>

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
