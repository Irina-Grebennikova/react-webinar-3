import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function AuthToCommentMsg({
  actionText,
  showCancelBtn = false,
  onCancel,
  onLinkClick,
}) {
  const cn = bem("AuthToCommentMsg");

  return (
    <p>
      <span className={cn("button")} onClick={onLinkClick}>
        Войдите
      </span>
      , чтобы иметь возможность {actionText}
      {showCancelBtn && (
        <span className={cn("button", { cancel: true })} onClick={onCancel}>
          Отмена
        </span>
      )}
    </p>
  );
}

AuthToCommentMsg.propTypes = {
  actionText: PropTypes.string.isRequired,
  showCancelBtn: PropTypes.bool,
  onCancel: PropTypes.func,
  onLinkClick: PropTypes.func.isRequired,
};

AuthToCommentMsg.defaultProps = {
  onCancel: () => {},
}

export default memo(AuthToCommentMsg);
