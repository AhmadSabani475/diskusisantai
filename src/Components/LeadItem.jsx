import PropTypes from 'prop-types';

function LeadItem({ user, score }) {
  return (
    <div className="flex justify-between p-2 my-2 border-b  border-gray-300">
      <div className="flex items-center gap-2 text-xl">
        <img src={user.avatar} alt={user.name} className="rounded-4xl  " />
        <h2>{user.name}</h2>
      </div>
      <span className="text-xl">{score}</span>
    </div>
  );
}
LeadItem.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};
export default LeadItem;
