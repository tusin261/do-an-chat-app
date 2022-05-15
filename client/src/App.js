import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './Pages/loginForm';
import SignUpForm from './Pages/signUpForm';
import Admin from './Pages/Admin';
import ProtectedRoute from './ProtectedRouter';
import Chat from './Pages/Chat'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar';
import Message from './components/Message';
import Confirm from './Pages/Confirm';
import RequireAuth from './RequireAuth';
import RequireAuthAdmin from './RequireAuthAdmin';
import HandleRedirect from './HandleRedirect';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/register" element={<SignUpForm />}></Route>
      <Route path="/handle-redirect" element={<HandleRedirect />}></Route>
      <Route
        path="/chat"
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <RequireAuthAdmin>
            <Admin />
          </RequireAuthAdmin>
        }
      ></Route>
      <Route path='confirm-email/:userId' element={<Confirm />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>404</p>
          </main>
        }
      />
    </Routes>

  );
}

export default App;
