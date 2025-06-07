import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the isPreload value when given by SET_IS_PRELOAD action
 */
describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrage
    const initialState = true;
    const action = {
      type: 'UNKOWN',
    };
    // action
    const nextState = isPreloadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the isPreload value when given by SET_IS_PRELOAD action', () => {
    // arrage
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };
    // action
    const nextState = isPreloadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
