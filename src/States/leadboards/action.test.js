import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../Api/mainApi';
import { asyncReceiveLeadboards, receiveLeadboards } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

/**
 * skenario test
 *
 * - asyncReceiveLeadboards thunk
 *  - should dispatch showLoading, receiveLeadboards, and hideLoading when fetching leaderboards is successful
 *  - should dispatch showLoading, alert error message, and hideLoading when fetching leaderboards fails
 */
const fakeLeaderboards = {
  data: {
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
const fakeErrorResponse = new Error('Ups, something went wrong');
describe('asyncReceiveLeadboards thunk', () => {
  beforeEach(() => {
    api._leaderboards = api.leaderboards;
  });
  afterEach(() => {
    api.leaderboards = api._leaderboards;
    delete api._leaderboards;
  });
  it('should dispatch showLoading, receiveLeadboards, and hideLoading when fetching leaderboards is successful', async () => {
    // arrage
    api.leaderboards = () => Promise.resolve(fakeLeaderboards);
    const dispatch = vi.fn();
    // action
    await asyncReceiveLeadboards()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeadboards(fakeLeaderboards.data.leaderboards)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch showLoading, alert error message, and hideLoading when fetching leaderboards fails', async () => {
    // arrage
    api.leaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncReceiveLeadboards()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
