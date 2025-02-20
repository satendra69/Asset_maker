import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillCaretDown, AiFillPropertySafety } from "react-icons/ai";
import { FaBuilding, FaHome } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { IoMdLogOut } from "react-icons/io";
import { CiLogin, CiSaveDown2 } from "react-icons/ci";
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
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const cityDropdownRef = useRef(null);
  const propDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

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
      !propDropdownRef.current.contains(event.target) &&
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setOpenCities(false);
      setOpenProp(false);
      setProfile(false);
    }
  };

  useEffect(() => {
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

  const handleCityDropdownClick = () => {
    setOpenCities(!citieOpen);
  };

  const handlePropDropdownClick = () => {
    setOpenProp(!propOpen);
  };

  const handleProfileDropdownClick = (e) => {
    e.stopPropagation();
    setProfile(!profile)
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Logout
  const handleLogout = () => {
    dispatch(signOutUserSuccess());
    navigate("/");
    toast.success("Logout Successful");
  };

  const goToSavedList = () => {
    navigate("/saved-list", { state: { userId: currentUser.id } });
  };

  const staticPropertyRoutes = [
    "/Property",
    "/Property/Apartments",
    "/Property/CommercialProperties",
    "/Property/PentHouses",
    "/Property/Plots",
    "/Property/RowHouses",
    "/Property/Villas",
    "/Property/Villaments",
  ];

  const isPropertyRoute = staticPropertyRoutes.includes(location.pathname);
  const isDynamicPropertyRoute = /^\/Property\/[^/]+(-[a-z0-9]+)+$/.test(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleScroll = () => {
      setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, setMenuOpen]);

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
        <div className="flex items-center justify-between p-3 mx-auto max-w-7xl md:px-6">
          {/* LOGO */}
          <Link to="/">
            <img
              src={"/Asset-Makers-Logo-Brightest.png"}
              alt="logo"
              className="object-contain h-12"
            />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-4 customeMenu">
            <li className="hidden sm:inline">
              <Link to={"/"}>HOME</Link>
            </li>
            <li className="relative hidden md:block"></li>

            {/* CITIES */}
            <button
              className="relative hidden md:block"
              onClick={handleCityDropdownClick}
              onMouseEnter={() => setOpenCities(true)}
              onMouseLeave={() => setOpenCities(false)}
            >
              <li className="items-center hidden gap-2 md:flex">
                <span> CITIES</span> <AiFillCaretDown />
              </li>
              <div
                className={`${citieOpen ? "block" : "hidden"} transition-all text-left duration-1000 absolute top-full left-0 shadow-md bg-white py-2 px-7 space-y-2 rounded-md`}
                ref={cityDropdownRef}
                onMouseEnter={() => setOpenCities(true)}
                onMouseLeave={() => setOpenCities(false)}
              >
                <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCityClick("Bengaluru")}>Bengaluru</p>
                <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCityClick("Hyderabad")}>Hyderabad</p>
                {/* <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCityClick("Tirupati")}>Tirupati</p> */}
              </div>
            </button>

            {/* PROPERTIES Dropdown */}
            <li className="relative hidden md:block">
              <button
                onClick={handlePropDropdownClick}
                onMouseEnter={() => setOpenProp(true)}
                onMouseLeave={() => setOpenProp(false)}
              >
                <li className="relative items-center hidden gap-2 sm:flex">
                  <span> PROPERTIES </span> <AiFillCaretDown />
                  <div
                    className={`${propOpen ? "block" : "hidden"} transition-all text-left duration-1000 absolute top-full left-0 shadow-md bg-white space-y-2 py-2 px-7 w-56 rounded-md `}
                    ref={propDropdownRef}
                    onMouseEnter={() => setOpenProp(true)}
                    onMouseLeave={() => setOpenProp(false)}
                  >
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("Apartments")}>Apartments</p>
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("Villas")}>Villas</p>
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("Plots")}>Plots</p>
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("RowHouses")}>Row Houses</p>
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("Villaments")}>Villaments</p>
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("CommercialProperties")}>Commercial Properties</p>
                    <p className="cursor-pointer hover:font-bold hover:text-black" onClick={() => handleCategoryClick("PentHouses")}>Pent Houses</p>
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
            <div className="relative hidden sm:inline">
              <div
                onClick={handleProfileDropdownClick}
                className="flex items-center gap-2 cursor-pointer"
              >
                <button className="flex items-center gap-2 px-3 py-2 text-white bg-red-700 rounded-lg">
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
                <motion.div
                  ref={profileDropdownRef}
                  className="absolute right-0 p-5 space-y-3 bg-white rounded-lg shadow-md"
                  onClick={handleProfileDropdownClick}
                >
                  {currentUser.admin === 1 && (
                    <a
                      href="/admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-900 whitespace-nowrap"
                    >
                      <MdOutlineAdminPanelSettings size={32} />
                      Admin Panel
                    </a>
                  )}
                  <div
                    className="flex items-center gap-2 text-slate-900 whitespace-nowrap"
                    onClick={goToSavedList}
                  >
                    <CiSaveDown2 size={32} />
                    Saved List
                  </div>
                  <button
                    className="flex items-center gap-2 text-slate-900 whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    {" "}
                    <IoMdLogOut size={32} />
                    Logout{" "}
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="items-center justify-center hidden gap-3 sm:flex">
              <Link to={"/sign-in"} className="flex items-center gap-1">
                <CiLogin size={22} />
                Login/Register
              </Link>
              <button className="flex items-center gap-2 px-3 py-2 text-white bg-red-700 rounded-lg">
                <span>Sell Property</span>
                <motion.div animate="swing" variants={pendulumVariants}>
                  <FaHome size={26} />
                </motion.div>
              </button>
            </div>
          )}

          {/* HAMBURGER MENU */}
          <div className="sm:hidden ">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <IoMdMenu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
         ref={menuRef}
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={variants}
          className={`absolute top-20 right-0 w-3/5 sm:hidden bg-[#F7F7F8] text-slate-900 p-4 rounded-l-3xl`}
        >
          <ul className="space-y-4">
            <li>
              <Link
                to={"/"}
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to={"/about-us"}
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to={"/contact-us"}
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleCityDropdown();
                  setMenuOpen(true);
                }}
                className="flex items-center justify-between w-full hover:underline focus:outline-none"
              >
                <span>CITIES</span> <AiFillCaretDown />
              </button>
              <div
                className={`${cityOpenMobile ? "block" : "hidden"} mt-2`}
              >
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCityClick("Bengaluru");
                    setMenuOpen(false);
                  }}
                >
                  Bengaluru
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCityClick("Hyderabad");
                    setMenuOpen(false);
                  }}
                >
                  Hyderabad
                </p>
                {/* <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCityClick("Tirupati");
                    setMenuOpen(false);
                  }}
                >
                  Tirupati
                </p> */}
              </div>
            </li>
            <li>
              <button
                onClick={() => {
                  togglePropDropdown();
                  setMenuOpen(true);
                }}
                className="flex items-center justify-between w-full hover:underline focus:outline-none"
              >
                <span>PROPERTIES</span> <AiFillCaretDown />
              </button>
              <div
                className={`${propOpenMobile ? "block" : "hidden"} mt-2`}
              >
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("Apartments");
                    setMenuOpen(false);
                  }}
                >
                  Apartments
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("Villas");
                    setMenuOpen(false);
                  }}
                >
                  Villas
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("Plots");
                    setMenuOpen(false);
                  }}
                >
                  Plots
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("RowHouses");
                    setMenuOpen(false);
                  }}
                >
                  Row Houses
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("Villaments");
                    setMenuOpen(false);
                  }}
                >
                  Villaments
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("CommercialProperties");
                    setMenuOpen(false);
                  }}
                >
                  Commercial Properties
                </p>
                <p
                  className="cursor-pointer hover:font-bold hover:text-black"
                  onClick={() => {
                    handleCategoryClick("PentHouses");
                    setMenuOpen(false);
                  }}
                >
                  Pent Houses
                </p>

              </div>
            </li>
            {currentUser ? (
              <li>
                <button
                  className="flex items-center justify-between w-full hover:underline focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                  }}
                >
                  Profile
                </button>
                <motion.div
                  className={`${isMenuVisible ? "block" : "hidden"} mt-2`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentUser.admin === 1 && (
                    <a
                      href="/admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-900 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                      }}
                    >
                      <MdOutlineAdminPanelSettings size={32} />
                      Admin Panel
                    </a>
                  )}
                  <div
                    className="flex items-center gap-2 text-slate-900 whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSavedList();
                      setMenuOpen(false);
                    }}
                  >
                    <CiSaveDown2 size={32} />
                    Saved List
                  </div>
                  <button
                    className="flex items-center gap-2 text-slate-900 whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    <IoMdLogOut size={32} />
                    Logout
                  </button>
                </motion.div>
              </li>
            ) : (
              <li>
                <Link
                  to={"/sign-in"}
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span>Login/Register</span> <CiLogin size={26} />
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </motion.div>

        {(isPropertyRoute || !isDynamicPropertyRoute) && active && (
          <motion.div
            className=" shadow-md bg-[#F7F7F8] hidden md:block"
            animate={active ? "open" : "closed"}
            variants={variants2}
          >
            {/* hr */}
            <hr className="w-full bg-slate-900" />
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
                <MdGrass size={25} />
                Plots
              </Link>
              <Link to={"/Property/RowHouses"} className="flex items-center gap-1 text-slate-900">
                <MdHouseSiding size={25} />
                Row Houses
              </Link>
              <Link to={"/Property/Villaments"} className="flex items-center gap-1 text-slate-900">
                <FaBuilding size={22} />
                Villaments
              </Link>
              <Link to={"/Property/CommercialProperties"} className="flex items-center gap-1 ">
                <AiFillPropertySafety size={25} />
                <span className="text-slate-900">Commercial Properties</span>
              </Link>
              <Link to={"/Property/PentHouses"} className="flex items-center gap-1 text-slate-900">
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
