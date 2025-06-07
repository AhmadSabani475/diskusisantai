import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../Api/mainApi';
import { asyncUsersAndThreads } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsAction } from '../threads/action';
import { receiveUsersAction } from '../users/action';

/**
 * test scenario for asyncUsersAndThreads thunk
 *
 * - asyncUsersAndThreads thunk function
 *   - should dispatch action correctly when data fetching is successful
 *   - should dispatch alert and hideLoading when data fetching fails
 */
const fakeThreadResponse = [
  {
    id: 'thread-1',
    title: 'Thread test',
    body: 'Ini adalah thread test',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];
const fakeUserResponse = [
  {
    id: 'users-1',
    name: 'users test',
    email: 'test@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];
const fakeErrorResponse = new Error(
  "Cannot read properties of undefined (reading 'users')"
);

describe('asyncUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._seeAllUsers = api.seeAllUsers();
    api._seeAllThreads = api.seeAllThreads();
  });
  afterEach(() => {
    api._seeAllUsers = api.seeAllUsers();
    api._seeAllThreads = api.seeAllThreads();
    delete api._seeAllUsers;
    delete api._seeAllUsers;
  });
  it('should dispatch action correctly when data fetching is successful', async () => {
    // arrage
    api.seeAllUsers = () =>
      Promise.resolve({
        data: {
          users: fakeUserResponse,
        },
      });

    api.seeAllThreads = () =>
      Promise.resolve({
        data: {
          threads: fakeThreadResponse,
        },
      });
    const dispatch = vi.fn();
    // action
    await asyncUsersAndThreads()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsAction(fakeThreadResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(receiveUsersAction(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch alert and hideLoading when data fetching fails', async () => {
    // arrage
    api.seeAllThreads = () => Promise.resolve(fakeThreadResponse);
    api.seeAllUsers = () => Promise.resolve(fakeUserResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncUsersAndThreads()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
