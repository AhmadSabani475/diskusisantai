/**
 * skenario testing
 *
 * - ThreadList component
 *   - should render all thread items correctly
 *   - should render empty state when no threads provided
 *   - should pass correct props to each ThreadItem
 *   - should handle upvote event correctly
 *   - should handle downvote event correctly
 *   - should pass authUser to each ThreadItem
 */

import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ThreadList from './ThreadList';
import ThreadItem from './ThreadItem';
vi.mock('./ThreadItem', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="thread-item-mock" />),
}));
describe('ThreadList component', () => {
  const mockThreads = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];
  const mockAuthUser = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };
  const mockUpVote = vi.fn();
  const mockDownVote = vi.fn();
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render all thread items correctly', async () => {
    // arrage
    render(
      <ThreadList
        threads={mockThreads}
        onDownVote={mockDownVote}
        onUpVote={mockUpVote}
        authUser={mockAuthUser}
      />
    );
    const ThreadItem = await screen.getAllByTestId('thread-item-mock');
    expect(ThreadItem).toHaveLength(mockThreads.length);
  });
  it('should render empty state when no threads provided', async () => {
    // arrage
    render(
      <ThreadList
        threads={[]}
        onDownVote={mockDownVote}
        onUpVote={mockUpVote}
        authUser={mockAuthUser}
      />
    );
    const ThreadItem = await screen.queryAllByTestId('thread-item-mock');
    expect(ThreadItem).toHaveLength(0);
  });
  it('should pass correct props to each ThreadItem', async () => {
    render(
      <ThreadList
        threads={mockThreads}
        onUpVote={mockUpVote}
        onDownVote={mockDownVote}
        authUser={mockAuthUser}
      />
    );
    expect(ThreadItem).toHaveBeenCalledTimes(mockThreads.length);
    mockThreads.forEach((thread, index) => {
      const call = ThreadItem.mock.calls[index];
      const props = call[0];
      expect(props.id).toBe(thread.id);
      expect(props.title).toBe(thread.title);
      expect(props.body).toBe(thread.body);
      expect(props.onUpVote).toBe(mockUpVote);
      expect(props.onDownVote).toBe(mockDownVote);
      expect(props.authUser).toEqual(mockAuthUser);
    });
  });
  it('should handle upvote event correctly', () => {
    render(
      <ThreadList
        threads={mockThreads}
        onUpVote={mockUpVote}
        onDownVote={mockDownVote}
        authUser={mockAuthUser}
      />
    );
    const firstThreadItemProps = ThreadItem.mock.calls[0][0];
    firstThreadItemProps.onUpVote(mockThreads[0].id);
    expect(mockUpVote).toHaveBeenCalledTimes(1);
    expect(mockUpVote).toHaveBeenCalledWith(mockThreads[0].id);
  });

  it('should handle downvote event correctly', () => {
    render(
      <ThreadList
        threads={mockThreads}
        onUpVote={mockUpVote}
        onDownVote={mockDownVote}
        authUser={mockAuthUser}
      />
    );
    const secondThreadItemProps = ThreadItem.mock.calls[1][0];
    secondThreadItemProps.onDownVote(mockThreads[1].id);
    expect(mockDownVote).toHaveBeenCalledTimes(1);
    expect(mockDownVote).toHaveBeenCalledWith(mockThreads[1].id);
  });

  it('should pass authUser to each ThreadItem', () => {
    render(
      <ThreadList
        threads={mockThreads}
        onUpVote={mockUpVote}
        onDownVote={mockDownVote}
        authUser={mockAuthUser}
      />
    );
    ThreadItem.mock.calls.forEach((call) => {
      const props = call[0];
      expect(props.authUser).toEqual(mockAuthUser);
    });
  });
});
