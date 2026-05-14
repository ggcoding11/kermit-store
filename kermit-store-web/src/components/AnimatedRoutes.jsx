import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Update from "../pages/Update";
import NotFound from "../pages/NotFound";
import ProductView from "../pages/ProductView";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/create"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Create />
              </motion.div>
            }
          />

          <Route
            path="/update/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Update />
              </motion.div>
            }
          />

          <Route
            path="/products/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductView />
              </motion.div>
            }
          />

          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
