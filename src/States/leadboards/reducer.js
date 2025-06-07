import { ActionType } from './action';

function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_LEADBOARDS:
    return action.payload.leaderboards;
  default:
    return leaderboards;
  }
}
export default leaderboardsReducer;
