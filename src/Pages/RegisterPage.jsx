import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../States/users/action';
import RegisterContainer from '../Components/RegisterContainer';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <RegisterContainer register={onRegister} />
    </section>
  );
}

export default RegisterPage;
