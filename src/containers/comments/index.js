import { memo, useEffect, useMemo, useRef, useState } from "react";
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
import useTranslate from "../../hooks/use-translate";

function Comments({ articleId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t, lang } = useTranslate();

  const [commentReplying, setCommentReplying] = useState(null);
  const [commentBeforeForm, setCommentBeforeForm] = useState(null);

  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const selectRedux = useSelectorRedux((state) => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
  }));

  const select = useSelector((state) => ({
    isAuth: state.session.exists,
    authUserId: state.session.user._id,
  }));

  const comments = useMemo(
    () =>
      treeToList(
        listToTree(selectRedux.comments, "_id", "article"),
        (item, level) => ({
          ...item,
          level,
        })
      ),
    [selectRedux.comments]
  );

  const addComment = (text, parent) => {
    dispatch(commentsActions.add(text, parent));
    setCommentReplying(null);
  };

  const navigateToLogin = () =>
    navigate("/login", { state: { back: location.pathname } });

  const onReply = (comment) => {
    const lastChildComment = findLastChild(comment);
    
    setCommentBeforeForm(lastChildComment);
    setCommentReplying(comment);
  };

  const findLastChild = (comment) => {
    return comment.children.length
      ? findLastChild(comment.children[comment.children.length - 1])
      : comment;
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsList
        comments={comments}
        commentReplying={commentReplying}
        commentBeforeForm={commentBeforeForm}
        onReply={onReply}
        isAuth={select.isAuth}
        lang={lang}
        authUserId={select.authUserId}
        articleInfo={{
          _id: articleId,
          _type: "article",
        }}
        cancelReply={() => setCommentReplying(null)}
        navigateToLogin={navigateToLogin}
        addComment={addComment}
        t={t}
      />
    </Spinner>
  );
}

Comments.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(Comments);
