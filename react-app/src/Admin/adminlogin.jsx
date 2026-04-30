import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ setAuth }) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, let's use a hardcoded password.
    // You can move this to an Environment Variable later.
    if (password === 'Sagereal39') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      setAuth(true);
      navigate('/admin');
    } else {
      alert('❌ Incorrect Password');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <h2>🛡️ Admin Access</h2>
        <input
          type='password'
          placeholder='Enter Admin Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='admin-input'
        />
        <button type='submit' className='admin-submit-btn'>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
