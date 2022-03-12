import {Routes,Route,Navigate} from 'react-router-dom'
import LoginForm from './Pages/loginForm';
import SignUpForm from './Pages/signUpForm';
import Chat from './Pages/Chat'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={user?<Navigate replace to="/chat" />:<LoginForm />}></Route>
      <Route path="/register" element={<SignUpForm />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
