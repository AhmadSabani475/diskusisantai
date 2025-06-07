import { useParams } from 'react-router-dom';
import CommentList from '../Components/CommentList';
import CreateComment from '../Components/CreateComment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncCreateComment,
  asyncDownVoteComment,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
} from '../States/threadDetail/action';
import {
  asyncDownVoteThread,
  asyncUpVoteThread,
} from '../States/threads/action';
import ThreadDetail from '../Components/ThreadDetail';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);
  const handleUpVoteThread = () => {
    dispatch(asyncUpVoteThread(id));
  };
  const handleDownVoteThread = () => {
    dispatch(asyncDownVoteThread(id));
  };
  const handleUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId));
  };
  const handleDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId));
  };
  const handleSendComment = (content) => {
    dispatch(asyncCreateComment(content, id));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div>
      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        onDownVote={handleDownVoteThread}
        onUpVote={handleUpVoteThread}
      />
      <CreateComment id={id} sendComment={handleSendComment} />
      <CommentList
        comments={threadDetail?.comments || []}
        authUser={authUser}
        onUpVote={handleUpVoteComment}
        onDownVote={handleDownVoteComment}
      />
    </div>
  );
}
export default DetailPage;
