import React from 'react';
import { FaHeart } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import stripHtml from '../Api/stripHtml';
import PropTypes from 'prop-types';
dayjs.extend(relativeTime);

function CommentItem({
  id,
  owner,
  authUser,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  content,
  onDownVote,
  onUpVote,
}) {
  const userId = authUser.id;

  const isUpVoted = upVotesBy.includes(userId);
  const isDownVoted = downVotesBy.includes(userId);
  console.log('up Comment : ', isUpVoted);
  const upVoteClick = () => {
    onUpVote(id, userId);
  };

  const downVoteClick = () => {
    onDownVote(id, userId);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 items-center">
          <div className="rounded-4xl p-3">
            <img
              src={
                owner?.avatar ||
                `https://ui-avatars.com/api/?name=${owner?.name}`
              }
              alt={owner?.name}
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-md font-mono">{owner?.name}</h2>
          </div>
          <span className="text-sm text-gray-500">
            {dayjs(createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="text-md font-mono px-2 mx-4">
        <p>{stripHtml(content)}</p>
      </div>
      <div className="flex items-center gap-3 px-2 py-1 my-2 mx-4">
        <button
          type="button"
          className="flex gap-2 items-center cursor-pointer"
          onClick={upVoteClick}
        >
          <FaHeart color={isUpVoted ? 'red' : 'gray'} />
          <span className="text-sm">{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className="flex gap-2 items-center cursor-pointer"
          onClick={downVoteClick}
        >
          <FaHeart
            color={isDownVoted ? 'blue' : 'gray'}
          />
          <span className="text-sm">{downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
}
CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.string.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onUpVote: PropTypes.func.isRequired,
};
export default CommentItem;
