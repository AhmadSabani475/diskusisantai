import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreload } from './States/isPreload/action';
import { asyncUnsetAuthUser } from './States/authUser/action';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SideBar from './Components/Sidebar';
import RegisterPage from './Pages/RegisterPage';
import Loading from './Components/Loading';
import DetailPage from './Pages/DetailPage';
import LeadboardsPage from './Pages/LeadboardsPage';
import CreatePage from './Pages/CreatePage';
import Page404 from './Pages/Page404';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );
  console.log(authUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPreload());
  }, [dispatch]);
  const logOut = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null || authUser === undefined) {
    return (
      <>
        <Loading />
        <main className="min-h-screen">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </main>
      </>
    );
  }

  console.log('authUser :', authUser);
  return (
    <>
      <Loading />
      <div className="flex h-screen ">
        <SideBar logOut={logOut} authUser={authUser} />
        <main className="min-h-screen w-full overflow-y-scroll">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/createThread" element={<CreatePage />} />
            <Route path="/leadboards" element={<LeadboardsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
