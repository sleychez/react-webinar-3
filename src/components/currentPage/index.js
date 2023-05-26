import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";


function CurrentPage() {

  return (
    <div className="CurrentPage">
      <Link to="/" className="CurrentPage-mainLink">
        Главная
      </Link>
    </div>
  );
}


export default memo(CurrentPage);