import PropTypes from 'prop-types';
import UseInput from '../Hooks/UseInput';

function ThreadInput({ createThread }) {
  const [title, setTitle] = UseInput('');
  const [category, setCategory] = UseInput('');
  const [body, setBody] = UseInput('');

  return (
    <form action="" className="flex flex-col p-4 w-full">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={setTitle}
        className="p-2 rounded-2xl w-full my-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={setCategory}
        className="p-2 rounded-2xl w-full my-2"
      />
      <textarea
        name=""
        id=""
        placeholder="What's New ?"
        value={body}
        onChange={setBody}
        className="p-4 rounded-2xl w-full my-2 overflow-y-scroll"
      />
      <button
        type="button"
        className="bg-black text-white text-center text-xl rounded-3xl my-2 p-3 font-bold cursor-pointer"
        onClick={() => createThread({ title, body, category })}
      >
        Create Thread
      </button>
    </form>
  );
}
ThreadInput.propTypes = {
  createThread : PropTypes.func.isRequired,
};
export default ThreadInput;
