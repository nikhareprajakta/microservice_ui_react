import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { AuthProvider } from "./components/context/auth-context.jsx";
import { ToastContainer } from "react-toastify";
import Register, { registerAction } from "./components/Register.jsx";
const routerPaths=createRoutesFromElements(
  <Route path="/" element={<App/>} errorElement={<ErrorPage/>}>
    <Route index element={<Home/>}/>
    <Route path="home" element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="login" element={<Login/>} action= {loginAction}/>
    <Route path="cart" element={<Cart/>}/>
   <Route path="register" element={<Register/>} action={registerAction}/>
  </Route>
);
const appRouter=createBrowserRouter(routerPaths)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={appRouter}/>
     </AuthProvider>
     
  </React.StrictMode>,
);
