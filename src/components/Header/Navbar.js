import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
    const { isLoggedIn, handleLogout, user } = useContext(AuthContext);
    const path = window.location.pathname;

  return (
    <div className='text-center flex flex-col items-start gap-y-2 md:flex-row md:gap-y-0 md:items-center md:gap-x-5 text-sm pl-5 lg:pl-0 md:px-10'>
        {isLoggedIn && 
            <span className='text-yellow-500 uppercase hover:scale-110 text-xl cursor-pointer transition'>
                {user && user.username}
            </span>
        }
        <Link 
            className={`${path === '/' ? 'text-yellow-600 underline' : 'text-white' } py-2 md:py-0 uppercase hover:text-blue-500 transition hover:scale-110`} 
            to="/"
        >
            Home
        </Link>

        {!isLoggedIn &&
            <>
                <Link 
                    className={`${path === '/login' ? 'text-yellow-600 underline' : 'text-white' } py-2 md:py-0 uppercase hover:text-blue-500 transition hover:scale-110`} 
                    to="/login"
                >
                    Login
                </Link>
                <Link 
                    className={`${path === '/signup' ? 'text-yellow-600 underline' : 'text-white' } py-2 md:py-0 uppercase hover:text-blue-500 transition hover:scale-110`} 
                    to="/signup"
                >
                    Sign Up
                </Link>
            </>
        }

        {isLoggedIn && 
            <Link 
                className={`${path === '/posts' ? 'text-yellow-600 underline' : 'text-white' } py-2 md:py-0 uppercase hover:text-blue-500 transition hover:scale-110`} 
                to="/posts"
            >
                Posts
            </Link>
        }

        {isLoggedIn &&
            <>
                <Link to="/posts/create" 
                    className={`${path === '/posts/create' ? 'text-yellow-600 underline' : 'text-white' } py-2 md:py-0 uppercase hover:text-blue-500 transition hover:scale-110`} 
                >
                    Create a new post
                </Link>

                <button 
                    className='uppercase py-2 text-sm px-3 md:py-2 text-white bg-red-600 hover:bg-red-700 text-center rounded-full transition' 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </>
        }
    </div>
  )
}

export default Navbar
