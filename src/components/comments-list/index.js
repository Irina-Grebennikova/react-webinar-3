import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function CommentsList({ comments=[] }) {
  return (
    <section className="CommentsList">
      <h2 className="CommentsList-title">Комментарии ({comments.length})</h2>
    </section>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    })
  })).isRequired,
};

export default memo(CommentsList);