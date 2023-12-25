import { memo, useEffect, useRef } from "react";
import AddCommentForm from "../../components/add-comment-form";
import AuthToCommentMsg from "../../components/auth-to-comment-msg";

const AddReply = ({
  isAuth,
  parent,
  indent = 0,
  commentReplying,
  navigateToLogin,
  cancelReply,
  addComment,
  t,
}) => {

  const formStyle = { marginLeft: `${indent}px` };

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commentReplying]);

  return (
    <>
      {isAuth && (
        <AddCommentForm
          title={t("comments.newReply")}
          style={formStyle}
          showCancelBtn
          parent={parent}
          onCancel={cancelReply}
          addComment={addComment}
          t={t}
          ref={formRef}
        />
      )}
      {!isAuth && (
        <AuthToCommentMsg
          actionText={t("comments.reply") + "."}
          style={formStyle}
          showCancelBtn
          onCancel={cancelReply}
          onLinkClick={navigateToLogin}
          t={t}
          ref={formRef}
        />
      )}
    </>
  );
};

export default memo(AddReply);
