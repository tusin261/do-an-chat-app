import {Routes,Route,Navigate} from 'react-router-dom'
import LoginForm from './Pages/loginForm';
import SignUpForm from './Pages/signUpForm';
import Chat from './Pages/Chat'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Admin from './Pages/Admin';

function App() {
  const [state,dispatch] = useContext(AuthContext);
  const {user} = state;

  function checkAdmin(){
    if(user){
      if(user.isAdmin){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }

  return (
    <Routes>
      <Route path="/" element={checkAdmin()?<Navigate replace to="/chat" />:<LoginForm />}></Route>
      <Route path="/register" element={<SignUpForm />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
}

export default App;
