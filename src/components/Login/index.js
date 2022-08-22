import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../Message/Message';


const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateUserInfo = (email, password) => {
    if(email === '' && password === '') {
      return {  username: 'Username is required',  email: 'Email is required',  password: 'Password is required'  };
    }else if (email === '') {
      return {  email: 'Email is required'  };
    } else if (password === '') {
      return {  password: 'Password is required'  };
    } else {
      return {  email: '',  password: ''  };
    }
  }

  const handleOnBlur = (e) => { 
    const { name, value } = e.target;
    const error = validateUserInfo(email, password);
    setError({ ...error, [name]: value === '' ? `${name} is required` : '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateUserInfo(email, password);
    if(errors.email === '' && errors.password === '') {
      setError({...error,  email: '',  password: ''  });

      // submit to server
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if(!response.ok){
        const { message } = await response.json();
        setServerError(message);
      }else {
        const data = await response.json();
        const { token } = data;
        const { username, user_id } = data.user;

        const user = {
          username,
          user_id,
          token
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('success', JSON.stringify('You are logged in successfully!'));
        window.location.reload();
        navigate('/posts', { replace: true });
        setEmail(''); 
        setPassword('');
      }
    }else {
    setError(errors);
    }
} 

  return (
    <div 
      className='font-[poppins] w-screen h-screen flex flex-col items-center justify-center bg-white'>
      <Message />
      <form 
        className='bg-cyan-800 w-full md:w-[600px] flex flex-col gap-y-5 px-6 py-8 rounded-md m-5 md:m-0'
        onSubmit={ handleSubmit }
      >
        <h1 className='text-2xl font-[600] text-center text-white uppercase tracking-wider'>
          Access your account
        </h1>
        <div className='flex flex-col gap-y-2'>
          <label className='text-white'>Email:</label>
          <input 
            name='email'
            type="email" 
            placeholder='Enter email address'
            className='w-full p-3 focus:outline-none rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleOnBlur}
            onFocus={() => setServerError('')}
          />
          {error && <p className="text-red-600">{error.email}</p>}
        </div> 

        <div className='flex flex-col gap-y-2'>
          <label className='text-white'>Password:</label>
          <div className='relative flex items-center'>
            <input 
              name='password'
              type={!showPassword ? "password" : "text"} 
              placeholder='Enter password'
              className='w-full p-3 focus:outline-none rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleOnBlur}
              onFocus={() => setServerError('')}
            />
            {!showPassword && 
              <AiFillEye 
              className='cursor-pointer text-xl absolute text-gray-500 top-4 right-3' 
              onClick={() => setShowPassword(showPassword => !showPassword)}
              />
            }
            {showPassword && 
              <AiFillEyeInvisible 
              className='cursor-pointer text-xl absolute text-gray-500 top-4 right-3' 
              onClick={() => setShowPassword(showPassword => !showPassword)}
              />
            }
          </div>
          {error && <p className="text-red-600">{error.password}</p>}
        </div>
       {serverError && <p className="text-red-600">{serverError}</p>}
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition'>Login</button>

        {/* A button to take a user to sign up page */}
        <div className='my-2 text-end text-white'> 
            <p className='flex items-center justify-end gap-x-2'>
              <span className='text-yellow-500'>Don't have an account?</span>
              <Link to='/signup' className='underline'>Sign up</Link>
            </p>
        </div>
      </form>
    </div>
  )
}

export default Login
