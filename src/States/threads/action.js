import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../Api/mainApi';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CATEGORIES: 'CATEGORIES',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD: 'NEUTRALVOTE_THREAD',
  CREATE_THREAD: 'CREATE_THREAD',
};

function receiveThreadsAction(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}
function upVoteThreadAction({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function downVoteThreadAction({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function neutralVoteThreadAction({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function createThreadAction(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}
function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteThreadAction({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadAction({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}
function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteThreadAction({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(neutralVoteThreadAction({ threadId, userId: authUser.id }));
    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.createThread({ title, body, category });
      console.log('API response:', response);
      dispatch(createThreadAction(response.data.thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export {
  ActionType,
  upVoteThreadAction,
  downVoteThreadAction,
  neutralVoteThreadAction,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  receiveThreadsAction,
  asyncCreateThread,
};
