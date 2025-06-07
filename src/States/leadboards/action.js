import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../Api/mainApi';

const ActionType = {
  RECEIVE_LEADBOARDS: 'RECEIVE_LEADBOARDS',
};

function receiveLeadboards(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADBOARDS,
    payload: {
      leaderboards,
    },
  };
}
function asyncReceiveLeadboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.leaderboards();
      const response = leaderboards.data.leaderboards;
      dispatch(receiveLeadboards(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export { ActionType, receiveLeadboards, asyncReceiveLeadboards };
