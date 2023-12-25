import { forwardRef, memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const AuthToCommentMsg = forwardRef(
  (
    { actionText, style, showCancelBtn = false, onCancel, onLinkClick, t },
    ref
  ) => {
    const cn = bem("AuthToCommentMsg");

    return (
      <p className={cn()} style={style} ref={ref}>
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
);

export default memo(AuthToCommentMsg);
