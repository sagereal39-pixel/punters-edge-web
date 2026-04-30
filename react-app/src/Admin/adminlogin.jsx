// src/Admin/AdminLogin.jsx
import { useState } from 'react';

function AdminLogin({ setAuth }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Setting your professional credentials
    if (credentials.username === 'Sage' && credentials.password === 'Sage123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      setAuth(true);
    } else {
      alert('❌ Invalid Credentials');
    }
  };

  return (
    <div className='admin-login-landing'>
      <div className='login-box'>
        <h2>🛡️ Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='Username'
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
