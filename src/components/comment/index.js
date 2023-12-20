import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import AddCommentForm from "../add-comment-form";
import AuthToCommentMsg from "../auth-to-comment-msg";
import dateTimeFormat from "../../utils/date-format";
import "./style.css";

function Comment({
  comment,
  onReply,
  isActive,
  isAuth,
  addComment,
  navigateToLogin,
  cancelReply,
}) {
  const cn = bem("Comment");
  const INDENT_SIZE = 30;
  const sectionStyle = { marginLeft: `${comment.level * INDENT_SIZE}px` };
  const commentInfo = {
    _id: comment._id,
    _type: "comment",
  };

  return (
    <section className={cn()} style={sectionStyle}>
      <div className={cn("header")}>
        <h5 className={cn("author")}>{comment.author.profile.name}</h5>
        <time className={cn("date")}>
          {dateTimeFormat(new Date(comment.dateCreate))}
        </time>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <button className={cn("button")} onClick={onReply}>
        Ответить
      </button>

      {isActive && isAuth && (
        <AddCommentForm
          title="Новый ответ"
          parent={commentInfo}
          showCancelBtn
          onCancel={cancelReply}
          addComment={addComment}
        />
      )}
      {isActive && !isAuth && (
        <AuthToCommentMsg
          actionText="ответить."
          showCancelBtn
          onCancel={cancelReply}
          onLinkClick={navigateToLogin}
        />
      )}
    </section>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  addComment: PropTypes.func.isRequired,
  cancelReply: PropTypes.func.isRequired,
  navigateToLogin: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  comment: {},
  onReply: () => {},
  isActive: false,
  isAuth: false,
  addComment: () => { },
  cancelReply: () => { },
  navigateToLogin: () => { },
};

export default memo(Comment);
