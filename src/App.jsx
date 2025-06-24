import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivateLayout from './components/layout/PrivateLayout';
import PublicLayout from './components/layout/PublicLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/post" element={<div>Post Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;