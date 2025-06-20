import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.UPVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const hasUpvoted = thread.upVotesBy.includes(action.payload.userId);
        return {
          ...thread,
          upVotesBy: hasUpvoted
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : [...thread.upVotesBy, action.payload.userId],
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }
      return thread;
    });
  case ActionType.DOWNVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const hasDownVotes = thread.downVotesBy.includes(
          action.payload.userId
        );
        return {
          ...thread,
          downVotesBy: hasDownVotes
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : [...thread.downVotesBy, action.payload.userId],
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }
      return thread;
    });
  case ActionType.NEUTRALVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }
      return thread;
    });
  case ActionType.CREATE_THREAD:
    return [action.payload.thread, ...threads];
  default:
    return threads;
  }
}

export default threadsReducer;
