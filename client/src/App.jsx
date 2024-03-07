// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Header from "./components/common/Header";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminDashboard from "./components/Admin/admin";
import Footer from "./components/common/Footer.jsx";
import Blogs from "./components/Blog/Blogs.jsx";
import BlogPage from "./components/Blog/BlogPage.jsx";
import ViewCars from "./components/Cars/ViewCars.jsx";
import ViewCarsByBrand from "./components/Cars/ViewCarsByBrand.jsx";
import ViewCar from "./components/Cars/ViewCar.jsx";
import NotFound from "./components/common/NotFound.jsx";

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route
          path="/cars/viewcars/:priceRange/:carType"
          element={<ViewCars />}
        />
        <Route path="/cars/viewcars/:fuelType" element={<ViewCars />} />
        <Route path="/cars/by-brand/:make" element={<ViewCarsByBrand />} />
        <Route path="/cars/viewcar/:id" element={<ViewCar />} />
        <Route path="*" element={<NotFound />} /> {/* Route for NotFound component */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
