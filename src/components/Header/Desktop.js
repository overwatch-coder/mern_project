import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../../assets/logo.png';

const Desktop = () => {
  return (
    <div className='flex justify-between items-center py-1'>
      <Link to="/" className='flex items-center gap-x-1'>
        <img src={logo} alt="watch Tech Logo" className='w-16 object-contain' />
        <h1 className='pl:10 font-[poppins] text-4xl text-blue-600 font-[500] tracking-wider'>WatchTech.</h1>
      </Link>
      <div>
        <Navbar />
      </div>
    </div>
  )
}

export default Desktop
