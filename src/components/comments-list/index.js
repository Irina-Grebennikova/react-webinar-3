import { Fragment, memo } from "react";
import Comment from "../comment";
import AddCommentForm from "../add-comment-form";
import AuthToCommentMsg from "../auth-to-comment-msg";
import AddReply from "../../containers/add-reply";
import "./style.css";

const CommentsList = (
  {
    comments = [],
    commentReplying,
    commentBeforeForm,
    onReply,
    isAuth,
    lang,
    authUserId,
    articleInfo,
    cancelReply,
    addComment,
    navigateToLogin,
    t,
  }
) => {
  return (
    <section className="CommentsList">
      <h2 className="CommentsList-title">
        {t("comments.title")} ({comments.length})
      </h2>
      {comments.map((c) => (
        <Fragment key={c._id}>
          <Comment
            comment={c}
            lang={lang}
            authUserId={authUserId}
            onReply={() => onReply(c)}
            t={t}
          />
          {commentReplying && c._id === commentBeforeForm?._id && (
            <AddReply
              isAuth={isAuth}
              parent={{
                _id: commentReplying?._id,
                _type: "comment",
              }}
              commentReplying={commentReplying}
              indent={commentReplying.level * 30 + 30}
              cancelReply={cancelReply}
              addComment={addComment}
              navigateToLogin={navigateToLogin}
              t={t}
            />
          )}
        </Fragment>
      ))}
      {isAuth && commentReplying === null && (
        <AddCommentForm
          title={t("comments.newComment")}
          addComment={addComment}
          parent={articleInfo}
          t={t}
        />
      )}
      {!isAuth && commentReplying === null && (
        <AuthToCommentMsg
          actionText={t("comments.comment")}
          onLinkClick={navigateToLogin}
          t={t}
        />
      )}
    </section>
  );
};

export default memo(CommentsList);
