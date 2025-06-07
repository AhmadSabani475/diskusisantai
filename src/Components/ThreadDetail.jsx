import dayjs from 'dayjs';
import { FaHeart } from 'react-icons/fa';
import stripHtml from '../Api/stripHtml';
import PropTypes from 'prop-types';

function ThreadDetail({
  id,
  title,
  body,
  createdAt,
  owner,
  category,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = (upVotesBy ?? []).includes(authUser.id);
  const isDownVoted = (downVotesBy ?? []).includes(authUser.id);

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

  return (
    <div className="flex flex-col p-3 mx-4">
      <div className="rounded-xl p-3 border border-gray-300 w-48 ">
        {category}
      </div>
      <div className="my-2  flex gap-2 items-center ">
        <h2 className="font-bold text-2xl">{title}</h2>
        <span className="text-sm text-gray-500">
          {dayjs(createdAt).fromNow()}
        </span>
      </div>
      <div className="mb-3">
        <p className="text-md text-justify">{stripHtml(body)}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex gap-2 cursor-pointer"
          onClick={upVoteClick}
        >
          <FaHeart color={isUpVoted ? 'red' : 'gray'} />
          <span className="text-sm">{(upVotesBy ?? []).length}</span>
        </button>
        <button
          type="button"
          className="flex gap-2 cursor-pointer"
          onClick={downVoteClick}
        >
          <FaHeart color={isDownVoted ? 'blue' : 'gray'} />
          <span className="text-sm">{(downVotesBy ?? []).length}</span>
        </button>
        <span className="ml-auto text-sm italic text-gray-600">
          Dibuat oleh {owner.name}
        </span>
      </div>
    </div>
  );
}
ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};
export default ThreadDetail;
