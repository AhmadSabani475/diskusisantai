import React from 'react';
import UseInput from '../Hooks/UseInput';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, setEmail] = UseInput('');
  const [password, setPassword] = UseInput('');
  return (
    <form
      action=""
      className="bg-slate-50 p-4 flex flex-col gap-4 justify-center"
    >
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={setEmail}
        className="p-3 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        className="p-3 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      />
      <button
        type="button"
        className="bg-black text-white cursor-pointer p-2 rounded-2xl w-[264px] h-[39px] border border-gray-300"
        onClick={() => login({ email, password })}
      >
        Log In
      </button>
    </form>
  );
}
LoginInput.propTypes = {
  login : PropTypes.func.isRequired,
};
export default LoginInput;
