import { forwardRef, memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const AddCommentForm = forwardRef((
  { title, style, showCancelBtn = false, parent, addComment, onCancel, t }, ref
) => {

  const cn = bem("AddCommentForm");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const comment = formData.get("comment").trim();

    if (!comment.length) {
      return;
    }
    addComment(comment, parent);

    form.reset();
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn()} style={style} ref={ref}>
      <h5 className={cn("title")}>{title}</h5>
      <textarea className={cn("textarea")} name={"comment"}></textarea>
      <br />
      <button>{t("comments.send")}</button>
      {showCancelBtn && (
        <button type="button" className={cn("cancel")} onClick={onCancel}>
          {t("comments.cancel")}
        </button>
      )}
    </form>
  );
});

export default memo(AddCommentForm);
