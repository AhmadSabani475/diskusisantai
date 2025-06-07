import PropTypes from 'prop-types';
import AddBanner from './AddBanner';
import ThreadList from './ThreadList';

function ThreadContainer({ threads, onUpVote, onDownVote, authUser }) {
  return (
    <div className=" p-4 w-full mx-4 overflow-y-auto ">
      <AddBanner authUser={authUser} />

      <ThreadList
        threads={threads}
        onDownVote={onDownVote}
        onUpVote={onUpVote}
        authUser={authUser}
      />
    </div>
  );
}
ThreadContainer.propTypes = {
  threads: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
};
export default ThreadContainer;
