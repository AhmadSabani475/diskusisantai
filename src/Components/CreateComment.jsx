import PropTypes from 'prop-types';
import UseInput from '../Hooks/UseInput';

function CreateComment({ sendComment }) {
  const [comment, setComment] = UseInput('');

  return (
    <div className="p-3 mx-4">
      <h2 className="font-mono text-xl">Buat Komentar</h2>
      <form action="" className="flex flex-col p-2 gap-2">
        <textarea
          type="text"
          className=" rounded-2xl p-2 overflow-y-scroll"
          value={comment}
          onChange={setComment}
          placeholder="What's Your Comment"
        />
        <button
          type="button"
          onClick={() => sendComment(comment)}
          className=" bg-black text-white cursor-pointer p-2 rounded-2xl w-[264px] h-[39px] border border-gray-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
CreateComment.propTypes = {
  sendComment: PropTypes.func.isRequired,
};
export default CreateComment;
