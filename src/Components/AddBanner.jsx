import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AddBanner({ authUser }) {
  return (
    <Link to="/createThread">
      <div className="flex gap-3 p-2 border-b border-b-gray-300">
        <div className="rounded-4xl p-1 ">
          <img
            src={authUser.avatar}
            alt={authUser.name}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <form action="" className="flex justify-between gap-3 w-full">
          <span
            type="text"
            placeholder=""
            className="w-[247px] p-2 rounded-2xl border"
          >
            What's New?
          </span>
          <button type="button" className="border border-black rounded-xl p-2">
            POST
          </button>
        </form>
      </div>
    </Link>
  );
}
AddBanner.propTypes = {
  authUser: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default AddBanner;
