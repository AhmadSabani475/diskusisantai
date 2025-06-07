import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../Api/mainApi';
import { asyncPreload, setAuthUserAction, setIsPreloadAction } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */
const fakeSeeOwnUserResponse = {
  data: {
    user: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};
const fakeErrorResponse = new Error('Ups, sometwhing went wrong');
describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._seeOwnUser = api.seeOwnUser;
    api._getAccessToken = api.getAccessToken;
  });
  afterEach(() => {
    api.seeOwnUser = api._seeOwnUser;
    delete api._seeOwnUser;
    api.getAccessToken = api._getAccessToken;
    delete api._getAccessToken;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrage
    api.seeOwnUser = () => Promise.resolve(fakeSeeOwnUserResponse);
    api.getAccessToken = () => 'fake-token';
    const dispatch = vi.fn();
    // action
    await asyncPreload()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadAction(true));
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserAction(fakeSeeOwnUserResponse.data.user)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadAction(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrage
    api.seeOwnUser = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    // action
    await asyncPreload()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadAction(true));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserAction(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadAction(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
