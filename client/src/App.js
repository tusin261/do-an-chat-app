import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './Pages/loginForm';
import SignUpForm from './Pages/signUpForm';
import Admin from './Pages/Admin';
import ProtectedRoute from './ProtectedRouter';
import Chat from './Pages/Chat'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar';
import Message from './components/Message';
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
        {/* <Route path="/topbar" element={<Topbar />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/chit" element={<Chit />}></Route>
        <Route path="/message" element={<Message />}></Route> */}
    </Routes>
    
  );
}

export default App;
