import React from 'react';
import LoginInput from './LoginInput';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LoginContainer({ login }) {
  console.log('LoginContainer render - login function:', login);
  return (
    <div className="flex flex-col p-4 border mt-2 rounded-2xl border-gray-300 text-center">
      <h2>Log In With Account</h2>
      <LoginInput login={login} />
      <span className="text-gray-400 mb-2">Or</span>

      <Link
        to="/register"
        className="mx-auto  bg-black text-white  p-2 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      >
        Register
      </Link>
    </div>
  );
}
LoginContainer.propTypes = {
  login : PropTypes.func.isRequired,
};
export default LoginContainer;
