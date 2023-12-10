import { memo } from "react";
import './style.css';

function NavBar({children}) {

  return (
    <div className="NavBar">
      {children}
    </div>
  );
}

export default memo(NavBar);