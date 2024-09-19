import "./App.css";

//component imports
import NavBar from "./components/header/NavBar";
import Home from "./components/Body/Home";
import ProductDetail from "./components/detailView/ProductDetail";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Order/Orders";
import Whishlist from "./components/SavedItems/Whishlist"
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Login/SignUp";
import AdminHome from "./components/admin/AdminHome";
import AdminSignUp from "./components/admin/AdminSignUp";
import Dashboard from "./components/admin/Dashboard";
import AdminProfile from "./components/admin/AdminProfile";
import ProductForm from "./components/admin/Products/ProductForm";
import ProductList from "./components/admin/Products/ProductList"

import ContextProvider from "./context/ContextProvider";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";

//ui imports
import { Box } from "@mui/material";
import UserProfile from "./components/Login/UserProfile";
import OrderList from "./components/admin/Orders/OrderList";
import CategoryList from "./components/admin/CategoryList";



function App() {
  return (
    <ContextProvider>
      <Router>
      <NavBar />
          <Box style={{ marginTop: 64 }}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Orders />} />
                  <Route path="/savedList" element={<Whishlist />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/user/profile" element= {<UserProfile />} />

                  {/*admin routes*/}
                  <Route path="/admin" element={<AdminHome />} />
                  <Route path="/admin/signup" element={<AdminSignUp/>}/>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/productList" element={<ProductList />} />
                  <Route path="/admin/addproduct" element = {<ProductForm/>} />
                  <Route path = "/admin/profile" element = {<AdminProfile />} />
                  <Route path="/admin/orderList" element = {<OrderList/>} />
                  <Route path="/admin/categoryList" element = {<CategoryList/>} />
              </Routes>
          </Box>
          <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
