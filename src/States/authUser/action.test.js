/**
 * skenario test
 * - asyncSetAuthUser thunk
 *  - should dispatch actions correctly on successful login
 *  - should handle error and alert on login failure
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch unset action and clear token
 */

import { describe, expect, it, vi } from 'vitest';
import { api } from '../../Api/mainApi';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserAction,
  unsetAuthUserAction,
} from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
const fakeLoginResponse = {
  data: {
    token: 'fake-access-token-123',
  },
};
const fakeAuthUserResponse = {
  data: {
    user: {
      id: 'user-1',
      name: 'User Test',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.png',
    },
  },
};

describe('authUser thunk', () => {
  it('should dispatch actions correctly on successful login', async () => {
    // arrage
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.seeOwnUser = () => Promise.resolve(fakeAuthUserResponse);
    const dispatch = vi.fn();
    // action
    await asyncSetAuthUser({ email: 'test@example.com', password: 'password' })(
      dispatch
    );
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserAction(fakeAuthUserResponse.data.user)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should handle error and alert on login failure', async () => {
    // arrage
    const fakeErrorResponse = new Error(
      'Login failed. Invalid email or password.'
    );
    api.login = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    await asyncSetAuthUser({
      email: 'wrong@example.com',
      password: 'password',
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch unset action and clear token',  () => {
    const dispatch = vi.fn();
    const putAccessTokenSpy = vi.spyOn(api, 'putAccessToken');
    asyncUnsetAuthUser()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserAction());
    expect(putAccessTokenSpy).toHaveBeenCalledWith('');
  });
});
