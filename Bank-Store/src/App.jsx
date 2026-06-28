import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import Home from "./components/Home";
import TopBar from "./components/frontLook/TopBar";
import SideBar from "./components/frontLook/SideBar";
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./components/context/auth-context";
function App() {
  const { isAuthenticated, logout } = useAuth();
  return (
      <>
      <TopBar/>
      
           {isAuthenticated ? <SideBar/> : ""}

       <Outlet />
      <Footer />
       <ToastContainer position="top-right" autoClose={3000} transition={Bounce}/>
    </>
  );
}

export default App;
