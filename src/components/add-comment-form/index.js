import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function AddCommentForm({
  title,
  parent,
  showCancelBtn = false,
  onCancel,
  addComment,
  t,
}) {
  const cn = bem("AddCommentForm");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    addComment(formData.get("comment"), parent);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
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
}

AddCommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  showCancelBtn: PropTypes.bool,
  onCancel: PropTypes.func,
  addComment: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

AddCommentForm.defaultProps = {
  onCancel: () => {},
  t: (key) => key,
};

export default memo(AddCommentForm);
