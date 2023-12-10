import { memo } from "react";
import { Link } from "react-router-dom";

function NavLinks() {
  return (
    <nav className="NavLinks">
      <Link to="/" className="NavLinks-link">
        Главная
      </Link>
    </nav>
  );
}

export default memo(NavLinks);
