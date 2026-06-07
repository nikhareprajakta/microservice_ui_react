import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import Home from "./components/Home";
import TopBar from "./components/frontLook/TopBar";
import SideBar from "./components/frontLook/SideBar";
import { Outlet } from "react-router-dom";
function App() {
  return (
      <>
      <TopBar/>
     <SideBar/>
       <Outlet />
      <Footer />
    </>
  );
}

export default App;
