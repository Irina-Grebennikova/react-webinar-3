import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import PropTypes from "prop-types";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import CommentsList from "../../components/comments-list";
import Spinner from "../../components/spinner";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function Comments({ articleId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [commentReplyingId, setCommentReplyingId] = useState(null);

  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const select = useSelectorRedux((state) => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
  }));

  const isAuth = useSelector((state) => state.session.exists);

  const comments = useMemo(
    () =>
      treeToList(
        listToTree(select.comments, "_id", "article"),
        (item, level) => ({
          ...item,
          level,
        })
      ),
    [select.comments]
  );

  const addComment = (text, parent) => {
    dispatch(commentsActions.add(text, parent));
    setCommentReplyingId(null);
  }

  const navigateToLogin = () =>
    navigate("/login", { state: { back: location.pathname } });

  return (
    <Spinner active={select.waiting}>
      <CommentsList
        comments={comments}
        activeCommentId={commentReplyingId}
        onReply={setCommentReplyingId}
        isAuth={isAuth}
        articleInfo={{
          _id: articleId,
          _type: "article",
        }}
        cancelReply={() => setCommentReplyingId(null)}
        navigateToLogin={navigateToLogin}
        addComment={addComment}
      />
    </Spinner>
  );
}

Comments.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(Comments);
