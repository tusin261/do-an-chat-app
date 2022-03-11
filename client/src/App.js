import {Routes,Route} from 'react-router-dom'
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/register" element={<SignUpForm />}></Route>
    </Routes>
  );
}

export default App;
