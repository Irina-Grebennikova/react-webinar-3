import { memo } from "react";
import PropTypes from "prop-types";
import Comment from "../comment";
import AddCommentForm from "../add-comment-form";
import AuthToCommentMsg from "../auth-to-comment-msg";
import "./style.css";

function CommentsList({
  comments = [],
  activeCommentId,
  onReply,
  isAuth,
  lang,
  articleInfo,
  cancelReply,
  addComment,
  navigateToLogin,
  t,
}) {
  return (
    <section className="CommentsList">
      <h2 className="CommentsList-title">{t("comments.title")} ({comments.length})</h2>
      {comments.map((c) => (
        <Comment
          key={c._id}
          comment={c}
          isActive={c._id === activeCommentId}
          isAuth={isAuth}
          lang={lang}
          cancelReply={cancelReply}
          addComment={addComment}
          onReply={() => onReply(c._id)}
          navigateToLogin={navigateToLogin}
          t={t}
        />
      ))}
      {isAuth && activeCommentId === null && (
        <AddCommentForm
          title={t("comments.newComment")}
          addComment={addComment}
          parent={articleInfo}
          t={t}
        />
      )}
      {!isAuth && activeCommentId === null && (
        <AuthToCommentMsg
          actionText={t("comments.comment")}
          onLinkClick={navigateToLogin}
          t={t}
        />
      )}
    </section>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      dateCreate: PropTypes.string,
      author: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
  activeCommentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onReply: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  articleInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string,
  }),
  cancelReply: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  navigateToLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(CommentsList);
