import dayjs from 'dayjs';
import { FaComment, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import stripHtml from '../Api/stripHtml';
import PropTypes from 'prop-types';
dayjs.extend(relativeTime);
function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)  }...` : text;
}
function ThreadItem({
  id,
  title,
  body,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser,
  onUpVote,
  onDownVote,
}) {
  const navigate = useNavigate();

  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  const upVoteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onUpVote(id);
  };

  const downVoteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDownVote(id);
  };

  const clickThread = () => {
    navigate(`/threads/${id}`);
  };
  const cleanBody = truncateText(stripHtml(body), 120);
  return (
    <div className="flex gap-2 w-full   mt-2">
      <div className="rounded-4xl p-3 ">
        <img src={user.avatar} alt={user.name} className="rounded-full" />
      </div>
      <div className="flex flex-col gap-2 w-full border-b border-b-gray-300 mb-4">
        <div className="flex items-center justify-between">
          <h2
            className="font-bold text-md font-mono cursor-pointer"
            onClick={clickThread}
          >
            {title}
          </h2>
          <span className="text-sm text-gray-500">
            {dayjs(createdAt).fromNow()}
          </span>
        </div>
        <p> {cleanBody}</p>
        <div className="flex items-center gap-3 mb-2">
          {/* Upvote button */}
          <button
            type="button"
            className="flex gap-2 cursor-pointer"
            onClick={upVoteClick}
          >
            <FaHeart
              className={isUpVoted ? 'text-pink-500' : 'text-gray-400'}
            />
            <span className="text-sm">{upVotesBy.length}</span>
          </button>

          {/* Downvote button */}
          <button
            type="button"
            className="flex gap-2 cursor-pointer"
            onClick={downVoteClick}
          >
            <FaHeart
              className={isDownVoted ? 'text-blue-500' : 'text-gray-400'}
            />
            <span className="text-sm">{downVotesBy.length}</span>
          </button>

          <span
            className="text-sm text-gray-600 flex gap-2 cursor-pointer"
            onClick={clickThread}
          >
            <FaComment />
            {totalComments}
          </span>
          <span className="ml-auto text-sm  text-gray-600">
            Dibuat oleh {user.name}
          </span>
        </div>
      </div>
    </div>
  );
}
ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};
export default ThreadItem;
