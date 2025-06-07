import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../Api/mainApi';
import { setAuthUserAction } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};
function setIsPreloadAction(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}
function asyncPreload() {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(setIsPreloadAction(true));
    const token = api.getAccessToken();
    if (!token) {
      dispatch(setAuthUserAction(null));
      dispatch(setIsPreloadAction(false));
      dispatch(hideLoading());
      return;
    }
    try {
      const response = await api.seeOwnUser();
      dispatch(setAuthUserAction(response.data.user));
    } catch {
      dispatch(setAuthUserAction(null));
    } finally {
      dispatch(setIsPreloadAction(false));
    }
    dispatch(hideLoading());
  };
}
export { ActionType, setAuthUserAction, asyncPreload, setIsPreloadAction };
