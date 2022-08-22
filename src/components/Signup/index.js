import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom'; 

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({  
    username: '',
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState('');

  // function to validate all user info
  const validateUserInfo = (username, email, password) => {
    if(username === '' && email === '' && password === '') {
      return {  username: 'Username is required',  email: 'Email is required',  password: 'Password is required'  };
    }else if (username === '') {
      return {  username: 'Username is required'  };
    } else if (email === '') {
      return {  email: 'Email is required'  };
    } else if (password === '') {
      return {  password: 'Password is required'  };
    } else {
      return {  username: '',  email: '',  password: ''  };
    }
  }

  // function to handle on blur event
  const handleOnBlur = (e) => { 
    const { name, value } = e.target;
    const error = validateUserInfo(username, email, password);
    setError({ ...error, [name]: value === '' ? `${name} is required` : '' });
  }

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate user info
    const errors = validateUserInfo(username, email, password);

    // if no errors, submit to server
    if(errors.username === '' && errors.email === '' && errors.password === '') {
      setError({...error,  username: '',  email: '',  password: ''  });
      setPassword('');
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
          username,
          email,
          password
        }),
      });
      if(response.ok) {
        //get the user info from the server
        const data = await response.json();

        //save user info to local storage
        const token = data.token;
        const username = data.savedUser.username;
        const user_id = data.savedUser.user_id;
        const user = {
          token,
          username,
          user_id
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('success', JSON.stringify('You have successfully signed up and logged in!'));
         // if successful, redirect to posts page
         window.location.reload();
         navigate('/posts', { replace: true });

        // set username, password and email to empty strings
        setUsername('');  
        setEmail(''); 
        setPassword('');
      }else {
        // if server returns error, set serverError
        const errors = await response.json();
        setServerError(errors.message);
      }
    }else {
      // if errors, set error
      setError(errors);
    }
  }


  return (
    <div 
      className='font-[poppins] w-screen h-screen flex flex-col items-center justify-center bg-white'>
      <form 
        className='bg-cyan-800 w-full md:w-[600px] flex flex-col gap-y-5 px-6 py-8 rounded-md m-5 md:m-0'
        onSubmit={ handleSubmit }
      >
        <h1 className='text-2xl font-[600] text-center text-white uppercase tracking-wider'>
          Create an account
        </h1>
        <div className='flex flex-col gap-y-2'>
          <label className='text-white'>Username:</label>
          <input 
            name='username'
            type="text" 
            placeholder='Enter username'
            className='w-full p-3 focus:outline-none rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleOnBlur}
            onFocus={() => setServerError('')}
          />
          <p className="text-red-600">{error.username}</p>
        </div> 

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
          <p className="text-red-600">{error.email}</p>
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
          <p className="text-red-600">
            {error.password}
          </p>
        </div>
        <p className="text-red-600">{serverError}</p>

        <button 
          type='submit' 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition'
        >
          Sign up
        </button>
        {/* A button to take a user to login page */}
        <div className='my-2 text-end text-white'> 
            <p className='flex items-center justify-end gap-x-2'>
              <span className='text-yellow-500'>Already have an account?</span>
              <Link to='/login' className='underline'>Login</Link>
            </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
