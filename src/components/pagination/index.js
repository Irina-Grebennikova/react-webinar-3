import { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ currentPage, lastPage }) {
  const cn = bem("Pagination");

  return (
    <div className="Pagination">
      <div className={cn("buttons")}>
        {currentPage > 2 && (
          <Link to={`?page=1`} className={cn("button")}>
            1
          </Link>
        )}
        {currentPage > 3 && <span className={cn("button", "rest")}>...</span>}
        {currentPage === lastPage && (
          <Link to={`?page=${lastPage - 2}`} className={cn("button")}>
            {lastPage - 2}
          </Link>
        )}
        {currentPage > 1 && (
          <Link to={`?page=${currentPage - 1}`} className={cn("button")}>
            {currentPage - 1}
          </Link>
        )}
        <span className={cn("button", "active")}>{currentPage}</span>
        {currentPage < lastPage && (
          <Link to={`?page=${currentPage + 1}`} className={cn("button")}>
            {currentPage + 1}
          </Link>
        )}
        {currentPage === 1 && (
          <Link to={`?page=3`} className={cn("button")}>
            3
          </Link>
        )}
        {currentPage < lastPage - 2 && (
          <span className={cn("button", "rest")}>...</span>
        )}
        {currentPage < lastPage - 1 && (
          <Link to={`?page=${lastPage}`} className={cn("button")}>
            {lastPage}
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(Pagination);
