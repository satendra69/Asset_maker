import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser, FaFileAlt, FaListAlt, FaCity, FaBlog, FaBlogger, FaMicroblog, FaTags, FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { FaFileCirclePlus } from "react-icons/fa6";
import "./sidebar.css";
import { GiVillage } from "react-icons/gi";
import { useSelector } from "react-redux";

const SideBar = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  const routes = currentUser && currentUser.id
    ? currentUser.admin
      ? [
        {
          path: "/",
          name: "Home",
          icon: <FaHome size={24} />,
        },
        {
          path: "/admin",
          name: "Property",
          icon: (
            <div style={{ position: 'relative', display: 'inline-block', fontSize: '2rem', marginBottom: '-2px' }}>
              <FaFileAlt size={24} style={{ color: '#dfe5e6' }} />
              <FaHome size={18} style={{ position: 'absolute', top: '12px', left: '10px', zIndex: 1 }} />
            </div>
          ),
          exact: true,
          subRoutes: [
            {
              path: "/admin",
              name: "Property List",
              icon: <FaListAlt size={15} />,
            },
            {
              path: "/admin/property/new",
              name: "Add New Property",
              icon: <FaFileCirclePlus size={24} />,
            },
            {
              path: "/admin/property/category",
              name: "Category",
              icon: <FaTags size={24} />,
            },
            {
              path: "/admin/property/regions",
              name: "Regions",
              icon: <FaMapMarkerAlt size={24} />,
            },
            {
              path: "/admin/property/testimonials",
              name: "Testimonials",
              icon: <FaQuoteLeft size={24} />,
            },
          ],
        },
        // {
        //   path: "/admin/city",
        //   name: "City",
        //   icon: <FaCity size={22} />,
        //   exact: true,
        //   subRoutes: [
        //     {
        //       path: "/admin/city",
        //       name: "City List",
        //       icon: <FaListAlt size={15} />,
        //     },
        //     {
        //       path: "/admin/city/new",
        //       name: "Add New City",
        //       icon: <FaFileCirclePlus size={15} />,
        //     },
        //   ],
        // },
        {
          path: "/admin/blog",
          name: "Blog",
          icon: <FaBlog size={24} />,
          exact: true,
          subRoutes: [
            {
              path: "/admin/blog",
              name: "Blog List",
              icon: <FaBlogger size={24} />,
            },
            {
              path: "/admin/blog/new",
              name: "Add New Blog",
              icon: <FaMicroblog size={24} />,
            },
          ],
        },
        {
          path: "/admin/users",
          name: "Users",
          icon: <FaUser size={22} />,
          exact: true,
          subRoutes: [
            {
              path: "/admin/users",
              name: "Users",
              icon: <FaUser size={15} />,
            },
          ],
        },
        {
          path: "/admin/messages",
          name: "Messages",
          icon: <MdMessage size={22} />,
        },

        {
          path: "/settings",
          name: "Settings",
          icon: <BiCog size={24} />,
          exact: true,
          subRoutes: [
            {
              path: "/admin/settings/profile",
              name: "Profile ",
              icon: <FaUser size={15} />,
            },
          ],
        },
        {
          path: "/admin/saved-list",
          name: "Saved",
          icon: <AiFillHeart size={24} />,
          state: { userId: currentUser.id },
        },
      ]
      : [
        {
          path: "/",
          name: "Home",
          icon: <FaHome size={24} />,
        },
        {
          path: "/admin",
          name: "Property",
          icon: <GiVillage size={26} />,
          exact: true,
          subRoutes: [
            {
              path: "/admin",
              name: "Property List",
              icon: <FaListAlt size={24} />,
            },
          ],
        },
        {
          path: "/admin/listing",
          name: "Listing",
          icon: (
            <div style={{ position: 'relative', display: 'inline-block', fontSize: '2rem', marginBottom: '-2px' }}>
              <FaFileAlt size={24} style={{ color: '#dfe5e6' }} />
              <FaHome size={18} style={{ position: 'absolute', top: '12px', left: '10px', zIndex: 1 }} />
            </div>
          ),
          exact: true,
          subRoutes: [
            {
              path: "/admin/listing/list",
              name: "Listing List",
              icon: <FaListAlt size={15} />,
            },
          ],
        },
        // {
        //   path: "/admin/city",
        //   name: "City",
        //   icon: <FaCity size={24} />,
        //   exact: true,
        //   subRoutes: [
        //     {
        //       path: "/admin/city",
        //       name: "City List",
        //       icon: <FaListAlt size={24} />,
        //     },
        //   ],
        // },
        {
          path: "/settings",
          name: "Settings",
          icon: <BiCog size={24} />,
          exact: true,
          subRoutes: [
            {
              path: "/admin/settings/profile",
              name: "Profile ",
              icon: <FaUser size={24} />,
            },
          ],
        },
        {
          path: "/admin/saved-list",
          name: "Saved",
          icon: <AiFillHeart size={24} />,
          state: { userId: currentUser.id },
        },
      ]
    : [];

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? (window.innerWidth > 768 ? "250px" : "200px") : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Asset Makers
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars size={24} onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch size={26} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={{
                    pathname: route.path,
                  }}
                  state={route.state ? route.state : undefined}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main style={{ width: isOpen ? "80%" : "100%" }}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
