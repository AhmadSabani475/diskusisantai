/**
 * test scenario for userReducer
 *
 * - userReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the users when given by RECEIVE_USERS action
 */

import { describe, expect, it } from 'vitest';
import userReducer from './reducer';
import { ActionType } from './action';

describe('userReducer Function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrage
    const initialState = [];
    const action = {
      type: 'UNKOWN',
    };
    // action
    const nextState = userReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the users when given by RECEIVE_USERS action', () => {
    // arrage
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'fulan',
            name: 'Si Fulan',
            email: 'fulan@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };
    // action
    const nextState = userReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
