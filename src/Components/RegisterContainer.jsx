import React from 'react';
import LoginInput from './LoginInput';
import { Link } from 'react-router-dom';
import RegisterInput from './RegisterInput';
import PropTypes from 'prop-types';

function RegisterContainer({ register }) {
  return (
    <div className="flex flex-col p-4 border mt-2 rounded-2xl border-gray-300 text-center">
      <h2>Register Your Account</h2>
      <RegisterInput register={register} />
      <span className="text-gray-400 mb-2">Or</span>

      <Link
        to="/login"
        className="mx-auto  bg-black text-white  p-2 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      >
        Login
      </Link>
    </div>
  );
}
RegisterContainer.propTypes = {
  register: PropTypes.func.isRequired,
};
export default RegisterContainer;
