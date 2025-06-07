import PropTypes from 'prop-types';
import UseInput from '../Hooks/UseInput';

function RegisterInput({ register }) {
  const [name, setName] = UseInput('');
  const [email, setEmail] = UseInput('');
  const [password, setPassword] = UseInput('');
  return (
    <form
      action=""
      className="bg-slate-50 p-4 flex flex-col gap-4 justify-center"
    >
      <input
        type="text"
        value={name}
        onChange={setName}
        placeholder="Name"
        className="bg-gray-300 p-4 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      />
      <input
        type="text"
        value={email}
        onChange={setEmail}
        placeholder="Email"
        className="bg-gray-300 p-4 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      />
      <input
        type="text"
        value={password}
        onChange={setPassword}
        placeholder="Password"
        className="bg-gray-300 p-4 rounded-2xl w-[264px] h-[39px] border border-gray-300"
      />
      <button
        type="button"
        className="bg-black text-white cursor-pointer p-2 rounded-2xl w-[264px] h-[39px] border border-gray-300"
        onClick={() => register({ name, email, password })}
      >
        Register
      </button>
    </form>
  );
}
RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
export default RegisterInput;
