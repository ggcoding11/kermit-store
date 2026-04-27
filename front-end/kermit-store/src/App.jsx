import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import "./App.css";

const App = () => {
  

  return (
    <div className="main container-fluid min-vh-100">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
