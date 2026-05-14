import React from "react";
import { Link } from "react-router-dom";
import KermitLogo from "/images/logo.png";

const Header = () => {
  return (
    <div className="d-flex justify-content-center p-2 mt-2 mb-2">
      <Link
        className="text-black link-underline link-underline-opacity-0"
        to="/"
      >
        <div className="d-flex align-items-center gap-2">
          <img className="img-fluid" src={KermitLogo} alt="main-logo" />
          <h1 className="m-0">Kermit Store</h1>
        </div>
      </Link>
    </div>
  );
};

export default Header;
