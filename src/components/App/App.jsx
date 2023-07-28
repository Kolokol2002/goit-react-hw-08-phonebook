import { Header } from 'components/Header';
import { Route, Routes } from 'react-router-dom';

import { Home } from 'views/Home';
import Login from 'views/Login';
import Register from 'views/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
