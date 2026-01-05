import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });

    // const data = await res.json();

    const res = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
      email: email,
      password: password,
    });

    if (res.data.access_token) {
      login(data);
      navigate('/products');
    } else {
      alert('Invalid username password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-black text-white px-4 py-2">
        Login
      </button>
    </div>
  );
};

export default Login;
