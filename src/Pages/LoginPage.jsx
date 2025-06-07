
import LoginContainer from '../Components/LoginContainer';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../States/authUser/action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  console.log('authUser di LoginPage:', authUser);
  const login = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <LoginContainer login={login} />
    </section>
  );
}
export default LoginPage;
