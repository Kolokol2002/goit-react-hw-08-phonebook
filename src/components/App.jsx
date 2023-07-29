import { Header } from 'components/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setUserInfo } from 'redux/authSlice';
import { useGetCurrentUserQuery } from 'redux/contactsApi';

import { Home } from 'views/Home';
import Login from 'views/Login';
import Register from 'views/Register';

function App() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetCurrentUserQuery();

  useEffect(() => {
    data !== undefined && dispatch(setUserInfo(data));
  }, [data, dispatch]);

  return (
    !isFetching && (
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    )
  );
}

export default App;
