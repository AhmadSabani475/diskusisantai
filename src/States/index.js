import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import threadsReducer from './threads/reducer';
import userReducer from './users/reducer';

import leaderboardsReducer from './leadboards/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
    users: userReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});
export default store;
