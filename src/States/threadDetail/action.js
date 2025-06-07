import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../Api/mainApi';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD: 'NEUTRALVOTE_THREAD',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALVOTE_COMMENT: 'NEUTRALVOTE_COMMENT',
  CREATE_COMMENT: 'CREATE_COMMENT',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
};
function receiveThreadDetail(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: detailThread,
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
function upVoteComment(userId, commentId) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}
function downVoteComment(userId, commentId) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}
function neutralVoteComment(userId, commentId) {
  return {
    type: ActionType.NEUTRALVOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}
function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const detailThread = await api.seeDetailThread(threadId);
      dispatch(receiveThreadDetail(detailThread.data.detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.data.id; // akses userId dari authUser.data
    dispatch(upVoteThreadAction({ threadId: threadDetail.id, userId }));
    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralVoteThreadAction({
          threadId: threadDetail.id,
          userId,
        })
      );
    }
    dispatch(hideLoading());
  };
}
function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.data.id;
    dispatch(downVoteThreadAction({ threadId: threadDetail.id, userId }));
    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralVoteThreadAction({
          threadId: threadDetail.id,
          userId,
        })
      );
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.data.id;
    dispatch(
      neutralVoteThreadAction({
        threadId: threadDetail.id,
        userId,
      })
    );
    try {
      await api.neutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    dispatch(upVoteComment(userId, commentId));

    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteComment(userId, commentId));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    dispatch(downVoteComment(userId, commentId));

    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteComment(userId, commentId));
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    dispatch(neutralVoteComment(userId, commentId));

    try {
      await api.neutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoading());
  };
}

function asyncCreateComment(content, threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createComment(content, threadId);

      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetail,
  asyncCreateComment,
  asyncDownVoteComment,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteComment,
  asyncNeutralVoteThreadDetail,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
  clearThreadDetailActionCreator,
  downVoteComment,
  downVoteThreadAction,
  neutralVoteComment,
  neutralVoteThreadAction,
};
