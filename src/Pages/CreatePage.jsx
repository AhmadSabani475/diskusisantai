import { useDispatch } from 'react-redux';
import ThreadInput from '../Components/ThreadInput';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../States/threads/action';

function CreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  };
  return (
    <section className="p-2 rounded-2xl border border-gray-300 flex flex-col justify-center items-center my-4 mx-4 ">
      <h2 className="text-2xl font-bold font-mono">Create Thread</h2>
      <ThreadInput createThread={handleCreateThread} />
    </section>
  );
}
export default CreatePage;
