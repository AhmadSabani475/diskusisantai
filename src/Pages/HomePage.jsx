import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUsersAndThreads } from '../States/shared/action';
import {
  asyncDownVoteThread,
  asyncUpVoteThread,
} from '../States/threads/action';
import ThreadList from '../Components/ThreadList';
import ThreadContainer from '../Components/ThreadContainer';
import UseInput from '../Hooks/UseInput';
import CategoryList from '../Components/CategoryList';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const [category, onCategoryChange] = UseInput('');
  console.log({ threads, users, authUser });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncUsersAndThreads());
  }, [dispatch]);
  const onUpVote = (id) => {
    dispatch(asyncUpVoteThread(id));
  };
  const onDownVote = (id) => {
    dispatch(asyncDownVoteThread(id));
  };
  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));
  const filteredThread = threadList.filter(
    (thread) => thread.category === category
  );
  return (
    <div className="flex flex-col items-center justify-center h-screen my-10 mx-10 border border-gray-300 rounded-2xl ">

      <CategoryList onChangeCategory={onCategoryChange}  />
      {category === '' ? (
        <ThreadContainer
          threads={threadList}
          onDownVote={onDownVote}
          onUpVote={onUpVote}
          authUser={authUser}
        />
      ) : (
        <ThreadContainer
          threads={filteredThread}
          onDownVote={onDownVote}
          onUpVote={onUpVote}
          authUser={authUser}
        />
      )}
    </div>
  );
}

export default HomePage;
