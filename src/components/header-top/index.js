import { memo } from "react";
import './style.css';

function HeaderTop({children}) {
  return <header className="HeaderTop">{children}</header>;
}

export default memo(HeaderTop);