import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, onUpVote, onDownVote, authUser }) {
  return (
    <>
      {threads.map((thread) => {
        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            onDownVote={onDownVote}
            onUpVote={onUpVote}
            authUser={authUser}
          />
        );
      })}
    </>
  );
}
ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};
export default ThreadList;
