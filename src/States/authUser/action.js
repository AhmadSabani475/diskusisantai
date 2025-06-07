import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../Api/mainApi';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};
function setAuthUserAction(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserAction() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const result = await api.login({ email, password });

      api.putAccessToken(result.data.token);

      const authUser = await api.seeOwnUser();
      dispatch(setAuthUserAction(authUser.data.user));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}
function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserAction());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  asyncSetAuthUser,
  setAuthUserAction,
  unsetAuthUserAction,
  asyncUnsetAuthUser,
};
