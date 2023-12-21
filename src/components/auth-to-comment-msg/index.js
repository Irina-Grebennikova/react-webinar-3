import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function AuthToCommentMsg({
  actionText,
  showCancelBtn = false,
  onCancel,
  onLinkClick,
  t
}) {
  const cn = bem("AuthToCommentMsg");

  return (
    <p>
      <span className={cn("button")} onClick={onLinkClick}>
        {t("comments.signIn")}
      </span>
      , {t("comments.toBeAble")} {actionText}
      {showCancelBtn && (
        <span className={cn("button", { cancel: true })} onClick={onCancel}>
           {t("comments.cancel")}
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
  t: PropTypes.func.isRequired,
};

AuthToCommentMsg.defaultProps = {
  onCancel: () => { },
  t: (key) => key,
}

export default memo(AuthToCommentMsg);
