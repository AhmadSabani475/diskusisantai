import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL: {
    const detail = action.payload || {};
    return {
      ...detail,
      upVotesBy: Array.isArray(detail.upVotesBy) ? detail.upVotesBy : [],
      downVotesBy: Array.isArray(detail.downVotesBy)
        ? detail.downVotesBy
        : [],
      comments: Array.isArray(detail.comments)
        ? detail.comments.map((comment) => ({
          ...comment,
          upVotesBy: Array.isArray(comment.upVotesBy)
            ? comment.upVotesBy
            : [],
          downVotesBy: Array.isArray(comment.downVotesBy)
            ? comment.downVotesBy
            : [],
        }))
        : [],
    };
  }

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.UPVOTE_THREAD: {
    if (!threadDetail) return threadDetail;
    const { userId } = action.payload;
    const hasUpvoted = threadDetail.upVotesBy.includes(userId);

    return {
      ...threadDetail,
      upVotesBy: hasUpvoted
        ? threadDetail.upVotesBy.filter((id) => id !== userId)
        : [...threadDetail.upVotesBy, userId],
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.DOWNVOTE_THREAD: {
    if (!threadDetail) return threadDetail;
    const { userId } = action.payload;
    const hasDownvoted = threadDetail.downVotesBy.includes(userId);

    return {
      ...threadDetail,
      downVotesBy: hasDownvoted
        ? threadDetail.downVotesBy.filter((id) => id !== userId)
        : [...threadDetail.downVotesBy, userId],
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.NEUTRALVOTE_THREAD: {
    if (!threadDetail) return threadDetail;
    const { userId } = action.payload;
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.UPVOTE_COMMENT: {
    if (!threadDetail) return threadDetail;
    const { userId, commentId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(userId)
              ? comment.upVotesBy.filter((id) => id !== userId)
              : [...comment.upVotesBy, userId],
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }

  case ActionType.DOWNVOTE_COMMENT: {
    if (!threadDetail) return threadDetail;
    const { userId, commentId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(userId)
              ? comment.downVotesBy.filter((id) => id !== userId)
              : [...comment.downVotesBy, userId],
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }

  case ActionType.NEUTRALVOTE_COMMENT: {
    if (!threadDetail) return threadDetail;
    const { commentId, userId } = action.payload;
    console.log('NEUTRALVOTE_COMMENT action payload:', { commentId, userId });

    const updatedComments = threadDetail.comments.map((comment) => {
      if (comment.id === commentId) {
        console.log(
          'Before neutral vote:',
          comment.upVotesBy,
          comment.downVotesBy
        );
        const updatedComment = {
          ...comment,
          upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
        };
        console.log(
          'After neutral vote:',
          updatedComment.upVotesBy,
          updatedComment.downVotesBy
        );
        return updatedComment;
      }
      return comment;
    });

    return {
      ...threadDetail,
      comments: updatedComments,
    };
  }

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
