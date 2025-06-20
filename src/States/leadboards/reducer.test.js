import { describe, expect, it } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the leaderboards when given by RECEIVE_LEADBOARDS action
 */
describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrage
    const initialState = [];
    const action = {
      type: 'UNKOWN',
    };
    // action
    const nextState = leaderboardsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the leaderboards when given by RECEIVE_LEADBOARDS action', () => {
    // arrage
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_LEADBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };
    // action
    const nextState = leaderboardsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
