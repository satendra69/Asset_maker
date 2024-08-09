import React, { useEffect } from "react";

import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
  ScrollRestoration,
} from "react-router-dom";

import ScrollToTop from './component/ScrollToTop';

import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

import SinglePage from "./pages/singlepage/SinglePage";
import AdminHome from "./admin/Pages/AdminHome";
import AdminUsers from "./admin/Pages/users/AdminUsers";
import Profile from "./admin/Pages/users/Profile";
import AdminMessages from "./admin/Pages/Message/AdminMessages";
import SingleUserMessages from "./admin/Pages/Message/SingleUserMessages";

import City from "./admin/Pages/City/City";
import SavedList from "./pages/SavedList";
import SideBar from "./admin/Component/Sidebar/SideBar";
import SingleCity from "./admin/Pages/City/SingleCity";

import CitiesBengaluru from "./pages/Cities/CitiesBengaluru";
import CitiesHyderabad from "./pages/Cities/CitiesHyderabad";
import CitiesTirupati from "./pages/Cities/CitiesTirupati";
import PropertyComponent from "./pages/Property/PropertyComponent";
import PropertyQuery from "./pages/Property/PropertyQuery";

import { useSelector } from "react-redux";

import NewListingPage from "./admin/Pages/Listing/Listing";
import Blog from "./admin/Pages/Blog/Blog";
import NewBlog from "./admin/Pages/Blog/NewBlog";
// import CreateCategory from "./admin/Pages/Blog/CreateCategory";
import CategoryPage from "./admin/Pages/CategoryPage";
import RegionsPage from "./admin/Pages/RegionsPage";

const Layout = () => (
  <>
    <Header />
    <div className="mt-16">
      <Outlet />
    </div>
    <Footer />
  </>
);

const AdminLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser || currentUser.admin !== 1) navigate("/");
  }, [currentUser]);

  return (
    currentUser && (
      <>
        <SideBar>
          <Outlet />
        </SideBar>
      </>
    )
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/saved-list",
        element: <SavedList />,
      },
      {
        path: "/Property/details/",
        element: <SinglePage />,
      },
      {
        path: "/Cities/Bengaluru",
        element: <CitiesBengaluru />,
      },
      {
        path: "/Cities/Hyderabad",
        element: <CitiesHyderabad />,
      },
      {
        path: "/Cities/Tirupati",
        element: <CitiesTirupati />,
      },
      {
        path: "/Property",
        element: <PropertyQuery />,
      },
      {
        path: "/Property/Apartments",
        element: <PropertyComponent defaultType="Apartments" />,
      },
      {
        path: "/Property/CommercialProperties",
        element: <PropertyComponent defaultType="CommercialProperties" />,
      },
      {
        path: "/Property/PentHouses",
        element: <PropertyComponent defaultType="PentHouses" />,
      },
      {
        path: "/Property/Plots",
        element: <PropertyComponent defaultType="Plots" />,
      },
      {
        path: "/Property/RowHouses",
        element: <PropertyComponent defaultType="RowHouses" />,
      },
      {
        path: "/Property/Villas",
        element: <PropertyComponent defaultType="Villas" />,
      },
      {
        path: "/Property/Villaments",
        element: <PropertyComponent defaultType="Villaments" />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <>
        <ScrollToTop />
        <AdminLayout />
      </>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/city",
        element: <City />,
      },
      {
        path: "/admin/city/:id",
        element: <SingleCity />,
      },
      {
        path: "/admin/messages",
        element: <AdminMessages />,
      },
      {
        path: "/admin/messages/:id",
        element: <SingleUserMessages />,
      },
      {
        path: "/admin/property/new",
        element: <NewListingPage />,
      },
      {
        path: "/admin/property/edit/:listingId",
        element: <NewListingPage />,
      },
      {
        path: "/admin/property/clone/:listingId",
        element: <NewListingPage action="clone" />,
      },
      {
        path: "/admin/blog/new",
        element: <NewBlog />,
      },
      {
        path: "/admin/blog",
        element: <Blog />,
      },
      {
        path: "/admin/property/category",
        element: <CategoryPage />,
      },
      {
        path: "/admin/property/regions",
        element: <RegionsPage />,
      },
      {
        path: "/admin/settings/profile",
        element: <Profile />,
      },

    ],
  },
]);
function App() {

  return (
    <RouterProvider router={router}>
      <ScrollRestoration />
    </RouterProvider>
  );
}

export default App;
