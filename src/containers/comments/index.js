import { memo, useMemo } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import PropTypes from "prop-types";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import CommentsList from "../../components/comments-list";
import Spinner from "../../components/spinner";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function Comments({ articleId }) {
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const select = useSelectorRedux((state) => ({
    comments: state.comments.list,
    waiting: state.comments.waiting,
  }));

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

  return (
    <Spinner active={select.waiting}>
      <CommentsList comments={comments} />
    </Spinner>
  );
}

Comments.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(Comments);
