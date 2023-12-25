import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import dateTimeFormat from "../../utils/date-format";
import "./style.css";

function Comment({
  comment,
  onReply,
  lang,
  authUserId,
  t,
}) {
  const cn = bem("Comment");
  
  const INDENT_SIZE = 30;
  const MAX_LEVEL = 16;
  const marginLeft = comment.level <= MAX_LEVEL ? comment.level * INDENT_SIZE : MAX_LEVEL * INDENT_SIZE;
  const sectionStyle = { marginLeft: `${marginLeft}px` };
  const locale = lang === "en" ? "en-US" : "ru-RU";

  return (
    <section className={cn()} style={sectionStyle}>
      <div className={cn("header")}>
        <h5
          className={cn("author", { active: comment.author._id === authUserId })}
        >
          {comment.author.profile.name}
        </h5>
        <time className={cn("date")}>
          {dateTimeFormat(new Date(comment.dateCreate), locale)}
        </time>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <button className={cn("button")} onClick={onReply}>
        {t("comments.reply")}
      </button>
    </section>
  );
}

export default memo(Comment);
