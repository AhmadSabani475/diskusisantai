import React from 'react';
import LoginInput from '../Components/LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
};

const Template = (args) => <LoginInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  login: ({ email, password }) => {
    alert(`Email: ${email}\nPassword: ${password}`);
  },
};
