import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './Pages/loginForm';
import SignUpForm from './Pages/signUpForm';
import Chat from './Pages/Chat'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Admin from './Pages/Admin';
import ProtectedRoute from './ProtectedRouter';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/register" element={<SignUpForm />}></Route>
      
      <Route path="/chat" element={
        <ProtectedRoute roleAdmin={false}>
          <Chat />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute roleAdmin={true} >
          <Admin />
        </ProtectedRoute>} />

    </Routes>
  );
}

export default App;
