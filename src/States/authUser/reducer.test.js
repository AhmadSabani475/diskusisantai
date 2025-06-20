import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the authUser when given by SET_AUTH_USER action
 *   - should return null when given by UNSET_AUTH_USER action
 */
describe('authUserReducer Function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: 'UNKOWN',
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrage
    const initialState = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrage
    const initialState = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
