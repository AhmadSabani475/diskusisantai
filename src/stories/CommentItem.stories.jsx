import React from 'react';
import CommentItem from '../Components/CommentItem';

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
};

const Template = (args) => <CommentItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'c1',
  owner: {
    name: 'John Doe',
    avatar: '', // bisa diisi atau dikosongkan untuk pakai ui-avatars
  },
  authUser: {
    id: 'user123',
  },
  createdAt: new Date().toISOString(),
  upVotesBy: ['user123'],
  downVotesBy: [],
  content: '<p>This is a <strong>comment</strong> with HTML!</p>',
  onDownVote: (id, userId) => console.log('Downvoted:', id, userId),
  onUpVote: (id, userId) => console.log('Upvoted:', id, userId),
};
