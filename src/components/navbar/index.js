import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";


function Navbar() {

  return (
    <div className="Navbar">
      <Link to="/" className="Navbar-mainLink">
        Главная
      </Link>
    </div>
  );
}


export default memo(Navbar);