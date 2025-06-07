import PropTypes from 'prop-types';
import {  FaSignOutAlt } from 'react-icons/fa';
import { FaMessage, FaRankingStar, FaThreads } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function SideBar({ authUser, logOut }) {
  if (!authUser) return null;
  return (
    <aside className="bg-slate-50 p-2  w-32 h-screen flex flex-col justify-between text-center">

      <div className="font-bold text-4xl mt-2 mx-auto">
        <h2 className='text-xl font-bold text-mono'>Ds</h2>
      </div>
      <div className="mx-auto text-2xl">
        <ul>
          <li className="my-4">
            <Link to="/">
              {' '}
              <FaMessage />{' '}
            </Link>
          </li>
          <li className="my-4">
            <Link to="/leadboards">
              {' '}
              <FaRankingStar />{' '}
            </Link>
          </li>
        </ul>
      </div>

      <button
        type="button "
        onClick={logOut}
        className="mx-auto text-2xl cursor-pointer"
      >
        <FaSignOutAlt />
      </button>
    </aside>
  );
}
SideBar.propTypes = {
  authUser : PropTypes.object,
  logOut : PropTypes.func.isRequired
};
export default SideBar;
