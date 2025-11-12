import "./App.css";
import ProductList from "./components/ProductList";
import Cart from "./pages/CartPage";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetailspage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import { Checkout } from "./pages/CheckoutPage";
import RegistrationPage from "./pages/RegistrationPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./context/firebaseConfig";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import AddProduct from "./pages/AddProductPage";
import AdminControls from "./pages/AdminPage";
import ProductDbPage from "./pages/ProductDbPage";
import UpdateProduct from "./pages/UpdateProduct";


const App = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
   <>
   
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/admin" element={<AdminControls />} />
          <Route path="/product-db" element={<ProductDbPage />} />
          <Route path="/product-db/update-product/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
      <Footer />
   </>
  );
}

export default App;
