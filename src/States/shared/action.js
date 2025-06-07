import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../Api/mainApi';
import { receiveThreadsAction } from '../threads/action';
import { receiveUsersAction } from '../users/action';

function asyncUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const usersResponse = await api.seeAllUsers();
      const users = usersResponse.data.users;
      const threadsResponse = await api.seeAllThreads();
      const threads = threadsResponse.data.threads;
      dispatch(receiveUsersAction(users));
      dispatch(receiveThreadsAction(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export { asyncUsersAndThreads };
