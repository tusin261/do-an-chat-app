import {Routes,Route} from 'react-router-dom'
import LoginForm from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import Chat from './Pages/Chat'
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/register" element={<SignUpForm />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
