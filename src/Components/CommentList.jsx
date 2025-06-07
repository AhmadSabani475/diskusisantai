import React from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

function CommentList({ comments = [], authUser, onUpVote, onDownVote }) {
  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">Belum ada komentar.</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg px-2">Komentar ({comments.length})</h2>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          owner={comment.owner}
          authUser={authUser}
          createdAt={comment.createdAt}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          content={comment.content}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string),
      downVotesBy: PropTypes.arrayOf(PropTypes.string),
      content: PropTypes.string.isRequired,
    })
  ),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};
export default CommentList;
