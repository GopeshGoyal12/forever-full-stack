import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const cleanEmail = email.trim().toLowerCase();

      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name: name.trim(),
          email: cleanEmail,
          password
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message || 'Account created successfully!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email: cleanEmail,
          password
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message || 'Logged in successfully!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log('Auth error:', error);
      toast.error(error.response?.data?.message || error.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-full max-w-sm mx-auto px-4 mt-8 sm:mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-6 sm:mt-10'>
        <p className='prata-regular text-2xl sm:text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? (
        <>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email'
            autoComplete="email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Password'
            autoComplete="current-password"
            required
          />
        </>
      ) : (
        <>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            autoComplete="name"
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email'
            autoComplete="email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Password'
            autoComplete="new-password"
            required
          />
        </>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => { setCurrentState('Sign Up'); }} className='cursor-pointer hover:underline'>Create account</p>
        ) : (
          <p onClick={() => { setCurrentState('Login'); }} className='cursor-pointer hover:underline'>Login Here</p>
        )}
      </div>

      <button type="submit" disabled={loading} className='w-full sm:w-auto bg-black text-white font-light px-8 py-3 mt-4 disabled:opacity-50 text-sm tracking-wider uppercase active:bg-gray-800 transition-colors'>
        {loading ? 'Please wait...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  );
};

export default Login;
