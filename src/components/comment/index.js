import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import dateTimeFormat from "../../utils/date-format";
import "./style.css";

function Comment({ comment }) {
  const cn = bem("Comment");
  const INDENT_SIZE = 30;
  const sectionStyle = { marginLeft: `${comment.level * INDENT_SIZE}px` };

  return (
    <section className={cn()} style={sectionStyle}>
      <div className={cn("header")}>
        <h5 className={cn("author")}>{comment.author.profile.name}</h5>
        <time className={cn("date")}>
          {dateTimeFormat(new Date(comment.dateCreate))}
        </time>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <button className={cn("button")}>Ответить</button>
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
};

export default memo(Comment);
