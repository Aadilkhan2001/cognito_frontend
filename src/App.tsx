import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import
{
  Login,
  Signup,
  VerifyCode,
  Home,
} from './Pages';

export const App = () =>
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-code/:email' element={<VerifyCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
